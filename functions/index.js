export async function onRequest() {
  const html = `<!doctype html>
<html itemscope="itemscope" itemtype="http://schema.org/WebPage">
<head>
<meta content="Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for." name="description">
<meta content="noodp" name="robots">
<meta itemprop="image" content="/images/google_favicon_128.png">
<title>Google</title>
<script>
(function(){window.google={kEI:"pK1kUZiFG8GjigKj1YHoDg",getEI:function(a){for(var b;a&&(!a.getAttribute||!(b=a.getAttribute("eid")));)a=a.parentNode;return b||google.kEI},https:function(){return"https:"==window.location.protocol},kEXPI:"17259",kCSI:{ei:"pK1kUZiFG8GjigKj1YHoDg"},authuser:0,ml:function(){},kHL:"en",time:function(){return(new Date).getTime()},log:function(){},lc:[],li:0,Toolbelt:{},y:{},x:function(a,b){google.y[a.id]=[a,b];return!1},load:function(a,b){google.x({id:"l"+a},function(){google.load(a,b)})}}})(); 
</script>
<style>
body{font-family:arial,sans-serif;margin:0;background:#fff}
.lst{height:25px;width:496px;font:18px arial,sans-serif}
.lsb{height:30px;font:15px arial,sans-serif;cursor:pointer}
a{color:#11c;text-decoration:none}
a:hover{text-decoration:underline}
</style>
</head>
<body>
<center>
<br><br>
<img src="logo1w.png" width="275" height="95">
<br><br>
<form action="/search">
<input name="q" class="lst">
<br><br>
<input type="submit" class="lsb" value="Google Search">
<input type="submit" class="lsb" value="I'm Feeling Lucky">
</form>
</center>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=UTF-8"
    }
  });
}
