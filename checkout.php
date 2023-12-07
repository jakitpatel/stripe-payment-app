<?php
// Get the raw POST data
$input_data = file_get_contents('php://input');

//require_once './vendor/autoload.php';
require_once '/home/erosenb/lib/php/stripe/vendor/autoload.php';
require_once './secrets.php';

\Stripe\Stripe::setApiKey($stripeSecretKey);
header('Content-Type: application/json');

//echo "Server Name : ".$_SERVER['SERVER_NAME'];

if (strpos($_SERVER['SERVER_NAME'], 'dev.') !== false){
    $envDomain = "dev";
} else if(strpos($_SERVER['SERVER_NAME'], 'test.') !== false){
    $envDomain = "test";
} else {
    $envDomain = "aws";
}

$YOUR_DOMAIN = 'http://localhost:3000';
$YOUR_DOMAIN = 'https://'.$envDomain.'.predictiveresponse.net/fusionEnergy/';

// Convert JSON data to PHP array/object
$data = json_decode($input_data);

// Access the data (if using JSON)
$priceAmt = $data->priceAmt;
$pmtType = $data->pmtType;

if (isset($priceAmt) && isset($pmtType)) {
  
    $priceAmt = floatval($priceAmt); // Using floatval()
    $centsAmount = round($priceAmt * 100); // Convert dollars to cents
    
    /*if($pmtType === "monthly"){
        $price = \Stripe\Price::create([
            'unit_amount' => $centsAmount, // The amount in cents
            'currency' => 'usd', // Replace with your desired currency code
            'recurring' => [
                'interval' => 'month' // Monthly subscription
            ]
        ]);
        $checkout_session = \Stripe\Checkout\Session::create([
            'line_items' => [[
                    'price' => $price->id, // Use the dynamically created Price ID
                    'quantity' => 1
            ]],
            'mode' => 'subscription',
            'success_url' => $YOUR_DOMAIN . '?success=true',
            'cancel_url' => $YOUR_DOMAIN . '?canceled=true'
        ]);
    } else {*/
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
            'cancel_url' => $YOUR_DOMAIN . '?canceled=true'
        ]);
    //}
      echo json_encode(array('id' => $checkout_session->id));
} else {
    // Handle error if required parameters are not provided
    echo 'Missing required parameters';
}
//header("HTTP/1.1 303 See Other");
//header("Location: " . $checkout_session->id);