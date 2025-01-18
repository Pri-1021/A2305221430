# **Average Calculator Microservice**

This is a microservice built with Node.js and Express. It fetches specific types of numbers from a third-party API, maintains a sliding window of the last 10 numbers, and calculates their average.

---

## **Features**

- Fetches numbers of different types from a third-party API:
  - `e`: Even numbers
  - `p`: Prime numbers
  - `f`: Fibonacci numbers
  - `r`: Random numbers
- Maintains a sliding window to track the last 10 numbers fetched.
- Calculates the average of the numbers in the sliding window.
- Returns the previous window state, current window state, and the fetched numbers.

---

## **API Endpoints**

### **GET `/numbers/:numberId`**

Fetches numbers from a third-party API based on the type specified in the `numberId` parameter.

#### **Path Parameters**
- `numberId`: Type of numbers to fetch:
  - `e`: Even numbers
  - `p`: Prime numbers
  - `f`: Fibonacci numbers
  - `r`: Random numbers

#### **Response Format**
```json
{
  "windowPrevState": [/* Previous numbers in the sliding window */],
  "windowCurrState": [/* Current numbers in the sliding window */],
  "numbers": [/* Newly fetched numbers */],
  "avg": /* Average of numbers in the current sliding window */
}








![WhatsApp Image 2024-07-29 at 14 30 07_91cd5748](https://github.com/user-attachments/assets/5d57bb85-420d-4376-a6c6-c6a38db49ac9)

![WhatsAp222222](https://github.com/user-attachments/assets/e01ba578-8db8-46d7-8d88-1df69e4807b6)
