const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

admin.initializeApp();

exports.processBooking = functions.firestore
  .document('bookings/{bookingId}')
  .onUpdate(async (change, context) => {
    const beforeData = change.before.data();
    const afterData = change.after.data();
    
    // Process only if the status changes to "finished"
    if (beforeData.status !== 'finished' && afterData.status === 'finished') {
      const { name, totalBookingAmount, customerState } = afterData;
      const GST_RATE = 0.18;
      const BUSINESS_STATE = 'Karnataka'; // Example business state

      // Calculate total GST
      const totalGST = totalBookingAmount * GST_RATE;
      let gstDetails = {};
      // if the transaction is intra-state or inter-state
      if (customerState === BUSINESS_STATE) {
        // Intra-state: Split GST equally into CGST and SGST
        gstDetails = {
          totalGST,
          cgst: totalGST / 2,
          sgst: totalGST / 2,
          igst: 0
        };
      } else {
        // Inter-state: Use IGST only
        gstDetails = {
          totalGST,
          cgst: 0,
          sgst: 0,
          igst: totalGST
        };
      }

      await admin.firestore().collection('bookings').doc(context.params.bookingId)
        .update({ gstDetails, updatedAt: admin.firestore.FieldValue.serverTimestamp() });

      // Call external GST API
      try {
        const apiUrl = 'https://api.example.com/gst/filing'; // had no idea and did not get the endpoint
        const payload = {
          bookingId: context.params.bookingId,
          name,
          totalBookingAmount,
          ...gstDetails
        };
        const headers = {
          'Authorization': 'Bearer YOUR_API_TOKEN', 
          'Content-Type': 'application/json'
        };

        const response = await axios.post(apiUrl, payload, { headers });
        console.log('GST API Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error calling GST API:', error);
        throw error;
      }
    }
    return null;
  });
