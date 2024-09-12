import { GoogleGenerativeAI } from "@google/generative-ai";
import { WATER } from "./const.js";
const genAI = new GoogleGenerativeAI(WATER);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

//************************************************************** */

// Add event listener to the button
document
  .getElementById("generateButton")
  .addEventListener("click", generateNotes);
const notesOutput = document.getElementById("notesOutput");
// Function to generate notes
async function generateNotes() {
  const syllabus = document.getElementById("syllabusInput").value;
  const loadingIndicator = document.getElementById("loadingIndicator");
  const generateDoc = document.getElementById("generateDoc");

  document.getElementById("generateButton").disabled = true;
  if (syllabus.trim() === "") {
    alert("ERROR: No input detected. Please enter data before proceeding.");
    return;
  }

  notesOutput.style.opacity = "0";
  loadingIndicator.style.display = "block";
  const prompt = syllabus.trim();

  const result = await model.generateContent(prompt);
  // console.log(result.response.text());
  const responseText = result.response.text();
  loadingIndicator.style.display = "none";
  var converter = new showdown.Converter();

  const htmlResponse = converter.makeHtml(responseText);

  notesOutput.innerHTML = `<h3 class="glitch">> Decrypted Knowledge:</h3>
                                     <p>${syllabus}</p>
                                     <p>${htmlResponse}</p>`;
  notesOutput.style.opacity = "1";
  document.getElementById("generateButton").disabled = false;
  generateDoc.disabled = false;
  generateDoc.addEventListener("click", () => generateDocx(htmlResponse));
}

//! Doc Manipulation

function generateDocx(text) {
  var converted = htmlDocx.asBlob(text);
  var link = document.createElement("a");
  link.href = URL.createObjectURL(converted);
  link.download = "document.docx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
