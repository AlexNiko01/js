<?php
$arg = 'T';
$vehicle = (($arg == 'B') ? 'bus' :
    ($arg == 'A') ? 'airplane' :
        ($arg == 'T') ? 'train' :
            ($arg == 'C') ? 'car' :
                ($arg == 'H') ? 'horse' :
                    'feet');
//echo $vehicle;

$vehicle = (((((($arg == 'B') ? 'bus' :
    $arg == 'A') ? 'airplane' :
    $arg == 'T') ? 'train' :
    $arg == 'C') ? 'car' :
    $arg == 'H') ? 'horse' :
    'feet');


$a = '1a';
echo ++$a;
