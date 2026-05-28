document
  .getElementById("uploadForm")
  .addEventListener("submit", async (e) => {

    e.preventDefault();

    const fileInput =
      document.getElementById("fileInput");

    const formData = new FormData();

    formData.append(
      "file",
      fileInput.files[0]
    );

    const response = await fetch(
      "/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const blob = await response.blob();

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "output.html";

    a.click();
});