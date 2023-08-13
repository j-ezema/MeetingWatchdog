package com.meetingwatchdog;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import java.net.URLDecoder;

public class AuthRedirectActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    handleIntent(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    handleIntent(intent);
  }

  private void handleIntent(Intent intent) {
    if (intent == null) {
      Log.e("AuthenticationError", "Received null intent");
      return;
    }

    String fullUri = intent.toString();
    Uri data = intent.getData();

    if (data == null && fullUri.contains("#")) {
      // Handle fragment
      int hashIndex = fullUri.indexOf('#');
      if (hashIndex > -1) {
        String fragment = fullUri.substring(hashIndex + 1);
        String[] pairs = fragment.split("&");
        for (String pair : pairs) {
          try {
            int idx = pair.indexOf("=");
            String key = idx > 0
              ? URLDecoder.decode(pair.substring(0, idx), "UTF-8")
              : pair;
            String value = idx > 0 && pair.length() > idx + 1
              ? URLDecoder.decode(pair.substring(idx + 1), "UTF-8")
              : null;
            if ("access_token".equals(key) && value != null) {
              String accessToken = value;
              // Use the access token as required
            }
          } catch (Exception e) {
            Log.e(
              "AuthenticationError",
              "Error parsing fragment: " + e.toString()
            );
          }
        }
      }
    } else if (
      data != null &&
      data.toString().startsWith("com.meetingwatchdog://oauth2redirect")
    ) {
      String accessToken = data.getQueryParameter("access_token");
      if (accessToken != null) {
        // You have the access token now! Use it as required
      } else {
        Log.e(
          "AuthenticationError",
          "Access token is missing in the returned URI"
        );
      }
    } else {
      Log.e(
        "AuthenticationError",
        "Unexpected intent data received: " +
        (data != null ? data.toString() : fullUri)
      );
    }
  }
}
