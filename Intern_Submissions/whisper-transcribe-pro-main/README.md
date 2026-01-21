
# 🎙️ Audio Transcription Web Application (Whisper Medium)

## Overview

This project is a web-based audio transcription system that allows users to upload audio files and receive transcribed text along with segmented timestamps. The system uses OpenAI’s **Whisper Medium** model to support multilingual transcription while balancing accuracy and computational efficiency.

The application is designed as a **two-page web app** with a clean, professional UI suitable for an enterprise internship project.

---

## Features

### 🌐 Website Structure

* **Home Page**

  * Brief description of the transcription system
  * Clear call-to-action button to upload audio
* **Upload Page**

  * Audio file upload interface
  * Upload and processing status indicators
  * Output display and download options

---

### ⚙️ Core Functionality

* Upload audio files directly from the browser
* Backend processing pipeline includes:

  * Speech-to-text transcription
  * Segmentation with timestamps
* Display transcribed text on the UI
* Display segmented timestamps in a readable format

---

### ⬇️ Download Options

* Download full transcript as a `.txt` file
* Download segmented timestamps as:

  * `.json` or `.csv`

---

## Model Details

* **Model Used:** Whisper Medium
* **Capabilities:**

  * Multilingual transcription
  * Reasonable accuracy with moderate compute requirements
* **Limitations:**

  * Whisper Large model was not used due to GPU constraints
  * Accuracy trade-off is clearly communicated in the UI

> The system is optimized for available infrastructure rather than maximum model size.

---

## Tech Stack

* **Frontend:** HTML, CSS, React (or equivalent)
* **Backend:** API-based processing for upload, transcription, segmentation, and download
* **Model Integration:** Whisper Medium
* **Architecture:** Modular and maintainable code structure

---

## User Flow

1. User visits the Home page
2. Clicks “Upload Audio”
3. Uploads an audio file (`.mp3`, `.wav`, `.m4a`)
4. System shows processing stages:

   * Uploading
   * Transcribing
   * Segmenting
   * Completed
5. User views results and downloads outputs

---

## Error Handling

* Invalid file format detection
* Upload failure messages
* Processing status feedback
* Clear success and failure notifications

---

## Project Status

✅ Core functionality implemented
✅ UI and backend integration completed
⚠️ Limited by available GPU resources (Medium model only)

---

## Future Improvements

* Support for Whisper Large model using GPU-enabled infrastructure
* Speaker diarization
* Real-time transcription
* Cloud deployment and scalability improvements
