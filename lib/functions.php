<?php
/**
 * Perform a GET request to the API endpoint
 *
 * @param  string $method with the url to to the request
 * 
 *
 * @return array  with the result
 */


    /**
     * TODO: Desarrolla un método para obtener los resultados de los ficheros JSON. Preferiblemente utilizando cURL.
     */
    $datos = [];
    
    $method = file_get_contents('./api/products.json');
    $datos = json_decode($method, true);
    
    return json_encode($datos);

