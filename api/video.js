export const config = {
  runtime: 'edge', 
};

export default async function handler(request) {
  const videoId = "1Zv9iP-VuwHc_bHPiIKyubeHWFk9FMFe7";
  const initialUrl = `https://docs.google.com/uc?export=download&id=${videoId}`;
  
  try {
    const fetchHeaders = new Headers();
    const range = request.headers.get("range");
    if (range) fetchHeaders.set("Range", range);
    
    let response = await fetch(initialUrl, { headers: fetchHeaders });
    const contentType = response.headers.get("content-type") || "";
    
    if (contentType.includes("text/html") || response.status === 200) {
      const text = await response.text();
      const match = text.match(/confirm=([a-zA-Z0-9_]+)/);
      if (match) {
        const confirmToken = match[1];
        const cookies = response.headers.get('set-cookie') || '';
        const cookieStr = cookies.split(';')[0];
        
        const confirmUrl = `https://docs.google.com/uc?export=download&id=${videoId}&confirm=${confirmToken}`;
        const confirmedHeaders = new Headers();
        if (range) confirmedHeaders.set('Range', range);
        if (cookieStr) confirmedHeaders.set('Cookie', cookieStr);
        
        response = await fetch(confirmUrl, { headers: confirmedHeaders });
      } else {
        return new Response('Confirm token not found', { status: 500 });
      }
    }

    const resHeaders = new Headers();
    response.headers.forEach((value, key) => {
      const lowerKey = key.toLowerCase();
      if (['content-type', 'content-length', 'content-range', 'accept-ranges'].includes(lowerKey)) {
        resHeaders.set(key, value);
      }
    });

    if (!resHeaders.has('content-type')) {
      resHeaders.set('content-type', 'video/mp4');
    }
    if (!resHeaders.has('accept-ranges')) {
      resHeaders.set('accept-ranges', 'bytes');
    }
    resHeaders.set('Access-Control-Allow-Origin', '*');

    return new Response(response.body, {
      status: response.status,
      headers: resHeaders
    });

  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}
