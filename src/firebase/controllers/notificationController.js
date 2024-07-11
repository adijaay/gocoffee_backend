const { admin } = require("../admin-firebase");

exports.sendNotification = async (req, res) => {
  try {
    const message = {
      notification: {
        title: req.body.title,
        body: req.body.body,
      },
      android: {
        priority: "high",
        ttl: 60 * 60 * 24,
        notification: {
          visibility: "public",
          sound: "default",
          notification_priority: "PRIORITY_HIGH", // For Android 6.0 and lower
          channel_id: "high_importance_channel", // Ensure this matches your channel ID
        },
      },
      data: req.body.data,
      tokens: req.body.token, // Ensure this is an array of tokens
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    console.log(response);

    if (response.failureCount > 0) {
      const failedTokens = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success) {
          console.log("Error sending notification because of:", resp.error);
          failedTokens.push(req.body.token[idx]);
        }
      });
      console.log("List of tokens that caused failures: " + failedTokens);
    }

    return {
      success: true,
      message: "Notification sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
