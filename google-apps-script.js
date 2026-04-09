// Google Apps Script for Wedding RSVP Form
// Deploy this as a Web App in Google Apps Script

// INSTRUCTIONS:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Paste this code
// 4. Create a Google Sheet and copy its ID from the URL
// 5. Replace 'YOUR_SHEET_ID_HERE' below with your actual Sheet ID
// 6. Deploy as Web App (Deploy > New deployment > Web app)
// 7. Set "Execute as" to "Me" and "Who has access" to "Anyone"
// 8. Copy the Web App URL and paste it in script.js

const SHEET_ID = '1htIcYg_H_sEiUwC7IJq1MKsIvJMj8zeqLBfyVC5PUZ8'; // Replace with your Google Sheet ID
const SHEET_NAME = 'RSVP Responses'; // Name of the sheet tab

function doPost(e) {
  try {
    // Parse the incoming data
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error('No data received');
    }
    
    // Open the spreadsheet
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Attending',
        'Number of Guests',
        'Dietary Restrictions',
        'Special Message'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4a5568');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.attending || '',
      data.guests || '',
      data.dietary || '',
      data.message || ''
    ];
    
    // Append the data
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    // sheet.autoResizeColumns(1, 8);
    
    // Return success response with CORS headers
    const output = ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'RSVP submitted successfully',
        'timestamp': timestamp.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    return output;
      
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    const output = ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
    
    return output;
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Wedding RSVP API is running',
      'note': 'Use POST method to submit RSVP data'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify setup
function testSetup() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    Logger.log('Successfully connected to spreadsheet: ' + ss.getName());
    return true;
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return false;
  }
}

