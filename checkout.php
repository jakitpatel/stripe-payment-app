<?php
// Get the raw POST data
$input_data = file_get_contents('php://input');

//require_once './vendor/autoload.php';
require_once '/home/erosenb/lib/php/stripe/vendor/autoload.php';
require_once './secrets.php';

\Stripe\Stripe::setApiKey($stripeSecretKey);
header('Content-Type: application/json');

$YOUR_DOMAIN = 'http://localhost:3000';
$YOUR_DOMAIN = 'https://dev.predictiveresponse.net/fusionEnergy/';

// Convert JSON data to PHP array/object
$data = json_decode($input_data);

// Access the data (if using JSON)
$priceAmt = $data->priceAmt;
$pmtType = $data->pmtType;

if (isset($priceAmt) && isset($pmtType)) {
  
    $priceAmt = floatval($priceAmt); // Using floatval()
    $centsAmount = round($priceAmt * 100); // Convert dollars to cents
    
    $checkout_session = \Stripe\Checkout\Session::create([
        'line_items' => [[
          'price_data' => [
              'currency' => 'usd',
              'product_data' => [
                  'name' => 'Donation',
                  'description' => "Donate for this Renewable Energy cause"
              ],
              'unit_amount' => $centsAmount // Amount in cents
          ],
          'quantity' => 1
        ]],
        'mode' => 'payment',
        'success_url' => $YOUR_DOMAIN . '?success=true',
        'cancel_url' => $YOUR_DOMAIN . '?canceled=true',
      ]);
      echo json_encode(array('id' => $checkout_session->id));
} else {
    // Handle error if required parameters are not provided
    echo 'Missing required parameters';
}
//header("HTTP/1.1 303 See Other");
//header("Location: " . $checkout_session->id);