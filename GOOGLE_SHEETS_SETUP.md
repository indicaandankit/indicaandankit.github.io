# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your wedding RSVP form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Wedding RSVP Responses"
4. Copy the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the long string between `/d/` and `/edit`

## Step 2: Set Up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete any default code
4. Copy and paste the entire contents of `google-apps-script.js` from this project
5. In the script, replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID from Step 1
6. Click the **Save** icon (💾) and name your project (e.g., "Wedding RSVP Handler")

## Step 3: Deploy as Web App

1. In Google Apps Script, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Wedding RSVP Form Handler" (or any description)
   - **Execute as**: Select **"Me"** (your Google account)
   - **Who has access**: Select **"Anyone"**
5. Click **Deploy**
6. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow**
7. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/...../exec`)

<!--
Deployment ID
AKfycbz0vDySJ8bT2kcMN04xNxZ7BB4fJk9xrVnuhC0cRASajB2bdLylaHOIp39S2UlwAcCC

Web App URL
https://script.google.com/macros/s/AKfycbz0vDySJ8bT2kcMN04xNxZ7BB4fJk9xrVnuhC0cRASajB2bdLylaHOIp39S2UlwAcCC/exec


-->
## Step 4: Update Your Website

1. Open `index.html` in your code editor
2. Find the RSVP form (around line 258):
   ```html
   <form class="rsvp-form" id="rsvpForm" data-google-sheets-url="">
   ```
3. Paste your Web App URL between the quotes:
   ```html
   <form class="rsvp-form" id="rsvpForm" data-google-sheets-url="https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec">
   ```
4. Save the file

## Step 5: Test the Integration

1. Open your website in a browser
2. Navigate to the RSVP section
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet - you should see a new row with the submitted data!

## Troubleshooting

### Form submits but data doesn't appear in Google Sheets

- **Check the Sheet ID**: Make sure you copied the correct Sheet ID in the Google Apps Script
- **Check the Web App URL**: Verify the URL in `index.html` matches the deployed Web App URL
- **Check permissions**: Make sure the Web App is set to "Anyone" can access
- **Redeploy**: Try creating a new deployment in Google Apps Script

### Authorization issues

- Make sure you clicked "Allow" when authorizing the script
- Try using an incognito/private browser window to test
- Check that you're logged into the correct Google account

### Data format issues

- The script automatically creates headers if the sheet is empty
- If you manually created headers, make sure they match the order in the script:
  - Timestamp, First Name, Last Name, Email, Attending, Number of Guests, Dietary Restrictions, Special Message

## Data Structure

Your Google Sheet will have the following columns:

| Timestamp | First Name | Last Name | Email | Attending | Number of Guests | Dietary Restrictions | Special Message |
|-----------|------------|-----------|-------|-----------|------------------|---------------------|-----------------|

## Security Notes

- The Web App URL is public, but only accepts POST requests with the expected data format
- Consider adding additional validation in the Google Apps Script if needed
- You can restrict access by changing "Who has access" to "Only myself" but you'll need to handle authentication
- The form uses `no-cors` mode, which is standard for Google Apps Script Web Apps

## Updating the Script

If you need to make changes to the Google Apps Script:

1. Edit the code in Google Apps Script editor
2. Save your changes
3. Click **Deploy** → **Manage deployments**
4. Click the edit icon (pencil) next to your deployment
5. Change the version to **"New version"**
6. Click **Deploy**
7. The Web App URL remains the same, so no need to update your website

## Additional Features

You can enhance the Google Apps Script to:

- Send email notifications when someone RSVPs
- Add data validation
- Create automatic responses
- Generate reports or statistics
- Integrate with other Google services (Calendar, Gmail, etc.)

## Support

If you encounter any issues:

1. Check the browser console for error messages (F12 → Console tab)
2. Check the Google Apps Script logs (View → Logs in the script editor)
3. Verify all URLs and IDs are correct
4. Make sure the Google Sheet exists and is accessible

---

**Note**: Due to CORS restrictions with Google Apps Script, the form will always show a success message even if there's an error. Check your Google Sheet to verify submissions are being recorded correctly.