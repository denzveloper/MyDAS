import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic' // Mencegah caching

// Fungsi untuk menangani error dengan lebih baik
function handleError(error: unknown, context: string) {
  if (error instanceof Error) {
    console.error(`[${context}]`, {
      message: error.message,
      name: error.name,
      stack: error.stack,
      ...(error as any).cause
    });
    return error;
  }
  console.error(`[${context}] Error tidak diketahui:`, error);
  return new Error('Terjadi kesalahan yang tidak diketahui');
}

export async function POST(request: Request) {
  console.log('Menerima request ke /api/scraping')
  try {
    const body = await request.json()
    console.log('Request headers:', Object.fromEntries(request.headers.entries()))
    console.log('Request body:', body)

    if (!body.url) {
      return NextResponse.json(
        { error: 'URL diperlukan' },
        { status: 400 }
      )
    }

    // URL webhook
    const testWebhookUrl = 'https://tequisa-n8n.217.15.164.63.sslip.io/webhook-test/Web_Midas';
    
    if (!testWebhookUrl.includes('Web_Midas') && !testWebhookUrl.includes('webhook.site')) {
      return NextResponse.json(
        { error: 'URL webhook tidak valid' },
        { status: 400 }
      );
    }
    
    console.log('Menggunakan URL webhook:', testWebhookUrl)

    // Gunakan email dan userid dari body request
    const userData = {
      userId: body.userid || null,
      userEmail: body.userEmail || null
    }

    // Siapkan data yang akan dikirim
    const webhookData = {
      url: body.url,
      maxResults: body.maxResults || 1,
      timestamp: new Date().toISOString(),
      source: 'MyDAS',
      ...userData // Tambahkan user data jika ada
    }
    
    // Konfigurasi fetch options
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(webhookData),
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'no-store',
      redirect: 'follow',
    };

    console.log('Mengirim data ke webhook:', webhookData);

    console.log('Data yang akan dikirim ke webhook:', webhookData)
    console.log('Mencoba mengirim request ke webhook...')
    
    try {
      console.log('Mengirim request ke:', testWebhookUrl);
    
    // Log fetch options tanpa body untuk keamanan
    const { body: _, ...safeFetchOptions } = fetchOptions;
    console.log('Dengan opsi:', JSON.stringify(safeFetchOptions, null, 2));
    
    let response;
    try {
      console.log('Memulai fetch ke webhook...');
      console.log('URL yang digunakan:', testWebhookUrl);
      
      // Coba GET request dulu untuk memeriksa ketersediaan endpoint
      try {
        const testResponse = await fetch(testWebhookUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'MyDAS-Webhook-Test/1.0'
          },
          redirect: 'follow'
        });
        
        console.log('Test GET request status:', testResponse.status);
        const testResponseText = await testResponse.text();
        console.log('Test response:', testResponseText);
        
        if (testResponse.status === 404) {
          console.warn('Endpoint mengembalikan 404, tetapi akan tetap dicoba dengan POST...');
        }
      } catch (testError) {
        console.warn('Peringatan saat test request:', testError);
        // Lanjutkan meskipun test gagal, mungkin membutuhkan POST
      }
      
      // Lakukan POST request dengan opsi yang lebih lengkap
      console.log('Mengirim POST request ke webhook...');
      response = await fetch(testWebhookUrl, {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          'User-Agent': 'MyDAS-Webhook/1.0',
          'Accept': 'application/json',
        },
        // Ikuti redirect
        redirect: 'follow'
      });
      console.log('Fetch selesai dengan status:', response.status);
    } catch (fetchError) {
      const err = handleError(fetchError, 'Webhook Fetch');
      throw new Error(`Gagal menghubungi webhook: ${err.message}`, { cause: err });
    }
      
      let responseText;
    try {
      responseText = await response.text();
      console.log('Status response webhook:', response.status);
      console.log('Header response webhook:', Object.fromEntries(response.headers.entries()));
      
      try {
        const responseJson = JSON.parse(responseText);
        console.log('Response webhook (JSON):', JSON.stringify(responseJson, null, 2));
      } catch (e) {
        console.log('Response webhook (text):', responseText.substring(0, 200) + (responseText.length > 200 ? '...' : ''));
      }
    } catch (readError) {
      const err = handleError(readError, 'Membaca Response');
      throw new Error(`Gagal membaca response: ${err.message}`, { cause: err });
    }

      if (!response.ok) {
        const errorInfo = {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseText
        };
        console.error('Detail error webhook:', errorInfo);
        
        if (response.status === 404) {
          throw new Error(`Endpoint webhook tidak ditemukan (404). Periksa URL: ${testWebhookUrl}`);
        } else if (response.status >= 500) {
          throw new Error(`Server webhook mengalami masalah (${response.status})`);
        } else if (response.status === 401 || response.status === 403) {
          throw new Error(`Akses ditolak (${response.status}). Mungkin memerlukan autentikasi.`);
        } else {
          throw new Error(`Error webhook: ${response.status} ${response.statusText}`);
        }
      }

      // Coba parse response sebagai JSON
      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = { rawResponse: responseText };
      }

      return NextResponse.json({ 
        success: true,
        message: 'Data berhasil diproses',
        data: responseData
      });
    } catch (error) {
      const err = handleError(error, 'API Route');
      
      // Return error response yang lebih informatif
      const errorResponse = {
        error: 'Terjadi kesalahan internal server',
        detail: err.message,
        type: err.name,
        ...(process.env.NODE_ENV === 'development' && {
          stack: err.stack,
          cause: (error as any).cause
        })
      };
      
      console.error('Mengembalikan error response:', errorResponse);
      
      return NextResponse.json(
        errorResponse,
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          }
        }
      );
    }
  } catch (error: any) {
    console.error('Error di API Route:', {
      pesan: error.message,
      stack: error.stack,
      nama: error.name,
      error: error
    });
    
    // Return error response yang lebih informatif
    const errorResponse = {
      error: 'Terjadi kesalahan internal server',
      detail: error.message,
      type: error.name,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        cause: (error as any).cause
      })
    };
    
    console.error('Mengembalikan error response:', errorResponse);
    
    return NextResponse.json(
      errorResponse,
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}