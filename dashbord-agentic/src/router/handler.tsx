// src/router/handler.tsx

export async function fetchByQuery(test: string) {
  try {
    const response = await fetch(`http://localhost:8000/items/${test}`);
    console.log("Raw response:", response);
    
    const data = await response.json();
    console.log("Parsed JSON:", data);
    
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function sendCSVFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:8000/items", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error uploading CSV:", error);
    return null;
  }
}
