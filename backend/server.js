const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

const upload = multer({
  dest: "uploads/"
});

app.use(express.static("frontend"));

function generateHTML(data) {

  let html = `
  <html>

  <head>

    <title>Generated Leads</title>

    <style>

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
      }

      body{
        font-family: Arial, sans-serif;
        background:#0f172a;
        color:white;
        padding:25px;
      }

      h1{
        text-align:center;
        margin-bottom:35px;
        font-size:32px;
        font-weight:bold;
        color:#ffffff;
      }

      .container{
        display:flex;
        flex-direction:column;
        align-items:center;
        gap:20px;
      }

      .card{
        width:100%;
        max-width:500px;
        background:#1e293b;
        border-radius:20px;
        padding:25px;

        box-shadow:
          0 10px 25px rgba(0,0,0,0.3);

        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
      }

      .card:hover{
        transform:translateY(-6px);

        box-shadow:
          0 15px 35px rgba(0,0,0,0.4);
      }

      h2{
        font-size:24px;
        margin-bottom:20px;
        color:#f8fafc;
      }

      .buttons{
        display:flex;
        gap:12px;
        flex-wrap:wrap;
      }

      .chat{
        background:linear-gradient(
          135deg,
          #ff006e,
          #e1306c
        );

        color:white;
        padding:12px 22px;
        text-decoration:none;
        border-radius:12px;
        font-weight:bold;
        transition:0.3s;
      }

      .chat:hover{
        transform:scale(1.05);
      }

      .done{
        background:linear-gradient(
          135deg,
          #22c55e,
          #16a34a
        );

        color:white;
        border:none;
        padding:12px 22px;
        border-radius:12px;
        cursor:pointer;
        font-weight:bold;
        transition:0.3s;
      }

      .done:hover{
        transform:scale(1.05);
      }

      .done.completed{
        background:#64748b;
      }

      @media(max-width:600px){

        body{
          padding:15px;
        }

        h1{
          font-size:26px;
        }

        .card{
          padding:20px;
        }

        .buttons{
          flex-direction:column;
        }

        .chat,
        .done{
          width:100%;
          text-align:center;
        }

      }

    </style>

  </head>

  <body>

    <h1>🚀 Generated Leads</h1>

    <div class="container">
  `;

  data.forEach(item => {

    html += `
      <div class="card">

        <h2>${item.name || "No Name"}</h2>

        <div class="buttons">

          <a
            class="chat"
            href="https://instagram.com/${item.username}"
            target="_blank"
          >
            Instagram Chat
          </a>

          <button
            class="done"
            onclick="
              this.innerText='Completed';
              this.classList.add('completed');
            "
          >
            Complete
          </button>

        </div>

      </div>
    `;
  });

  html += `
    </div>

  </body>

  </html>
  `;

  return html;
}

app.post("/upload", upload.single("file"), (req, res) => {

  const rawData = fs.readFileSync(req.file.path);

  const jsonData = JSON.parse(rawData);

  const html = generateHTML(jsonData);

  const outputPath = path.join(
    __dirname,
    "../output/output.html"
  );

  fs.writeFileSync(outputPath, html);

  res.download(outputPath);
});

app.listen(3000, () => {
  console.log("🚀 Server started on http://localhost:3000");
});