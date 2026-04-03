const testBackend = async () => {
  console.log("Testing POST /api/generate...");
  try {
    const response = await fetch('http://localhost:5000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: "AI in Digital Marketing",
        platform: "LinkedIn",
        audience: "Marketing Professionals"
      })
    });
    
    const data = await response.json();
    console.log("\n✅ Response from Server:\n", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error connecting to server:", error.message);
  }
};

testBackend();
