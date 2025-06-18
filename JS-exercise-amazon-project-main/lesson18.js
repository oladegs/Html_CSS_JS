// 18a
const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

xhr.open("GET", "https://supersimplebackend.dev/greeting");

xhr.send();

// 18b
fetch("https://supersimplebackend.dev/greeting")
  .then((response) => {
    return response.text();
  })
  .then((textData) => {
    console.log(textData);
  });

// 18c
async function loadGreeting() {
  const response = await fetch("https://supersimplebackend.dev/greeting");
  const textData = await response.text();
  console.log(textData);
}
loadGreeting();

// 18d
async function loadPostGreeting() {
  const response = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Farouk",
    }),
  });

  const textData = await response.text();
  console.log(textData);
}
loadPostGreeting();

// 18e
async function loadAmazon() {
  try {
    const response = await fetch("https://amazon.com", {});
    const textData = await response.text();
    console.log(textData);
  } catch (error) {
    console.log("❗CORS error. Your request was blocked by the backend");
    console.log(error); // Optional: log the actual error for debugging
  }
}
loadAmazon();

//18g
async function loadLoadGreeting() {
  try {
    const response = await fetch("https://supersimplebackend.dev", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status >= 400) {
      throw response;
    }

    const textData = await response.text();
    console.log(textData);
  } catch (error) {
    if (error.status === 400) {
      const stat = await error.json();
      console.log(stat);
    } else {
      console.log(error);
      console.log("❗Network error. Please try again later.");
    }
  }
}
loadLoadGreeting();
