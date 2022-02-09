<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class DataExport implements FromQuery, WithHeadings, WithColumnFormatting
{
    private $query;
    private $names = [];

    public function __construct($query)
    {
        $this->query = $query;

        if ($this->query->first()) {
            $this->names = array_keys($this->query->first()->attributesToArray());
        }
    }

    public function query()
    {
        return $this->query;
    }

    public function headings(): array
    {
        return $this->names;
    }

    public function columnFormats(): array
    {
        return [
            'C' => NumberFormat::FORMAT_DATE_DDMMYYYY,
        ];
    }
}
