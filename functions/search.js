export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  let resultsHtml = "";
  let resultCount = "0";

  if (q) {
    const ddg = await fetch("https://api.duckduckgo.com/?q=" + encodeURIComponent(q) + "&format=json&no_redirect=1&no_html=1");
    const data = await ddg.json();

    const topics = data.RelatedTopics || [];

    let count = 0;

    for (const item of topics) {
      if (item.Text && item.FirstURL) {
        count++;
        resultsHtml += `
          <li class="g">
            <h3 class="r">
              <a href="${item.FirstURL}">${item.Text}</a>
            </h3>
            <div class="s">
              <span class="st">${item.Text}</span>
            </div>
          </li>
        `;
      }

      if (item.Topics) {
        for (const sub of item.Topics) {
          if (sub.Text && sub.FirstURL) {
            count++;
            resultsHtml += `
              <li class="g">
                <h3 class="r">
                  <a href="${sub.FirstURL}">${sub.Text}</a>
                </h3>
                <div class="s">
                  <span class="st">${sub.Text}</span>
                </div>
              </li>
            `;
          }
        }
      }
    }

    resultCount = count.toLocaleString();
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${q ? q : "Search"}</title>
<style>
body{font-family:arial;margin:0}
.lst{width:400px;padding:6px;font-size:16px}
.g{margin-bottom:20px}
.r a{font-size:16px;color:#12c;text-decoration:none}
.r a:hover{text-decoration:underline}
.st{color:#222}
#top{background:#f1f1f1;padding:15px}
</style>
</head>

<body>

<div id="top">
  <form action="/search">
    <input class="lst" name="q" value="${q}">
    <button type="submit">Search</button>
  </form>
</div>

<div style="padding:15px">
  <div id="resultStats">About ${resultCount} results</div>
  <ol>
    ${resultsHtml || "<li>No results</li>"}
  </ol>
</div>

</body>
</html>
`;

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8"
    }
  });
}