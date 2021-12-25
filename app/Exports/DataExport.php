<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;

class DataExport implements FromQuery
{
    private $query;

    public function __construct($query)
    {
        $this->query = $query;
    }

    public function query()
    {
        return $this->query;
    }
}
