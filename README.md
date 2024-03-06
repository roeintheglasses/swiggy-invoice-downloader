# Swiggy Invoice Downloader

This Google Apps Script downloads all Swiggy invoice attachments from your Gmail and saves them as PDFs in a dedicated Google Drive folder.

## Usage
1. **Copy the Script:** Copy the entire script code provided in [index.js](https://github.com/roeintheglasses/swiggy-invoice-downloader/blob/main/index.js).
2. **Open Apps Script Editor:** In your Browser open [Google AppsScript](https://script.google.com/) > Click on New Project.
3. **Paste the Script & Save:** Paste the copied code into the script editor window and save.
5. **Set the Date Range:** Update the `startDate` and `endDate` variables at the bottom of the script with your desired date range in `YYYY/MM/DD` format.
6. **Run the Script:** Select the main function and Run the script.
7. **Authorize the Script (First Time Only):** The first time you run the script, you'll be prompted to authorize it to access your Gmail and Drive. Grant the necessary permissions.

*Note: This script retrieves emails only from the inbox. It won't search through labels or archived emails.*

## How's the code?
The script has functions to:
  - Build a search query based on the date range and keywords related to Swiggy invoices.
  - Validate the provided date format.
  - Retrieve Gmail threads matching the search criteria.
  - Create a "swiggyInvoices" folder in your Google Drive if it doesn't exist.
  - Download and save PDF attachments found in the email threads to the "swiggyInvoices" folder.
- The main function takes the start and end date as arguments validates them, and then calls the other functions to perform the search, download, and save operations.
- Logs are included to track the script's progress.

### Disclaimer
This script is provided for personal use and educational purposes only. You are responsible for understanding the script's functionality and ensuring it meets your needs.
