
const express = require("express");
const app = require("express")();
const axios = require("axios");
require("dotenv").config();

const port = 3000;
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIyMjQzNjM2LCJpYXQiOjE3MjIyNDMzMzYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjAzNTRjZDhmLTg5YTQtNDAwNy05NTMzLTZmOGE5Yjk2YTU2OSIsInN1YiI6InByaXlhbnNoLmJoYWRhdXJpYUBzLmFtaXR5LmVkdSJ9LCJjb21wYW55TmFtZSI6IkFNSVRZIFVOSVZFUlNJVFRZIE5PSURBIiwiY2xpZW50SUQiOiIwMzU0Y2Q4Zi04OWE0LTQwMDctOTUzMy02ZjhhOWI5NmE1NjkiLCJjbGllbnRTZWNyZXQiOiJkaUtWVFVkWlVDWUhkWUlzIiwib3duZXJOYW1lIjoiUHJpeWFuc2ggQmhhZGF1cmlhIiwib3duZXJFbWFpbCI6InByaXlhbnNoLmJoYWRhdXJpYUBzLmFtaXR5LmVkdSIsInJvbGxObyI6IkEyMzA1MjIxNDMwIn0.R40DKHNBpipxzan6oIwdGI3oYM6YCWYeJjpOy-WdjIs";

const windowSize = 10;


let windowCurrState = [];

// Function to fetch numbers from the third-party server
async function fetchNumbers(numberid) {
  try {
    const response = await axios.get(`http://20.244.56.144/test/${numberid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching numbers:", error);
    return [];
  }
}


function calculateAverage(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

app.get("/numbers/:numberId", async (req, res) => {
  const numberId = req.params.numberId;
  let type;
  
  if (numberId === "e") {
    type = "even";
  } else if (numberId === "p") {
    type = "primes";
  } else if (numberId === "f") {
    type = "fibo";
  } else if (numberId === "r") {
    type = "rand";
  }
  const numbers = await fetchNumbers(type);

  // Update the window state
  const windowPrevState = [...windowCurrState];
  windowCurrState = [...windowCurrState, ...numbers.numbers];

  windowCurrState = windowCurrState.slice(-windowSize);

  
  const average = calculateAverage(windowCurrState);

  // Format the response
  const response = {
    windowPrevState,
    windowCurrState,
    numbers: numbers.numbers,
    avg: average,
  };

  res.json(response);
});

app.listen(port, () => {
  console.log(`Average Calculator microservice listening on port ${port}`);
});
