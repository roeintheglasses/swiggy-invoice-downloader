/**
 * @param {string} startDate
 * @param {string} endDate
 */
function getSearchQueryForDateRange(startDate, endDate) {
  // Configure search criteria
  return `after:${startDate} before:${endDate} (has:attachment OR has:drive) has:pdf swiggy`;
}

/**
 * @param {string} dateString
 */
function checkIfDateIsValid(dateString) {
  const regex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/;
  return regex.test(dateString);
}

/**
 * @param {string} startDate
 * @param {string} endDate
 */
function getAllSwiggyInvoiceEmailThreads(startDate, endDate) {
  let query = getSearchQueryForDateRange(startDate, endDate);
  // Get Gmail threads matching the criteria
  let threads = GmailApp.search(query);
  return threads;
}

function getGoogleDriveFolder() {
  // Create "swiggyInvoices" folder if it doesn't exist
  let folderInstance = DriveApp.getFoldersByName("swiggyInvoices");

  let folderExists = folderInstance.hasNext();
  let folder;

  if (!folderExists) {
    folder = DriveApp.createFolder("swiggyInvoices");
  } else {
    folder = folderInstance.next();
  }

  return folder;
}

/**
 * @param {GmailApp.GmailThread} threads
 * @param {DriveApp.Folder} folder
 */
function findAndDownloadSwiggyPdfAttachments(threads, folder) {
  // Loop through each thread
  Logger.log("Found " + (threads.length + 1) + " threads for swiggy invoices");

  let attachmentType = "application/pdf";

  for (let i = 0; i < threads.length; i++) {
    let messages = threads[i].getMessages();

    // Loop through each message in the thread
    for (let j = 0; j < messages.length; j++) {
      let attachments = messages[j].getAttachments();

      // Loop through each attachment
      for (let k = 0; k < attachments.length; k++) {
        let attachment = attachments[k];

        // Check if attachment is PDF
        if (attachment.getContentType() !== attachmentType) return;

        let filename = attachment.getName();
        let blob = attachment.getAs(attachmentType);

        // Create file in "swiggyInvoices" folder
        let file = folder.createFile(blob);
        Logger.log(
          "Downloaded attachment: " + filename + " to swiggyInvoices folder"
        );
      }
    }
  }
}

/**
 * @param {string} startDate
 * @param {string} endDate
 */
function main(startDate, endDate) {
  if (!checkIfDateIsValid(startDate) || !checkIfDateIsValid(endDate)) {
    Logger.log("Date format invalid, Check again");
    return;
  }

  Logger.log("Started");
  let mailThreads = getAllSwiggyInvoiceEmailThreads(startDate, endDate);
  let driveFolder = getGoogleDriveFolder();
  findAndDownloadSwiggyPdfAttachments(mailThreads, driveFolder);
  Logger.log("Finished");
}

// Example usage (replace with your desired date range)
// Add your start and end date in YYYY/MM/DD format below
let startDate = "2023/04/06";
let endDate = "2024/03/08";

main(startDate, endDate);
