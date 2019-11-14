import { Injectable } from '@angular/core';

import * as convert from 'convert-units';

@Injectable({
  providedIn: 'root'
})
export class UnitConversionService {

  static measurements = [
    {
      type: 'length',
      list: [
        {
          abbr: 'mm',
          measure: 'length',
          system: 'metric',
          singular: 'Millimeter',
          plural: 'Millimeters'
        },
        {
          abbr: 'cm',
          measure: 'length',
          system: 'metric',
          singular: 'Centimeter',
          plural: 'Centimeters'
        },
        {
          abbr: 'm',
          measure: 'length',
          system: 'metric',
          singular: 'Meter',
          plural: 'Meters'
        },
        {
          abbr: 'km',
          measure: 'length',
          system: 'metric',
          singular: 'Kilometer',
          plural: 'Kilometers'
        },
        {
          abbr: 'in',
          measure: 'length',
          system: 'imperial',
          singular: 'Inch',
          plural: 'Inches'
        },
        {
          abbr: 'yd',
          measure: 'length',
          system: 'imperial',
          singular: 'Yard',
          plural: 'Yards'
        },
        {
          abbr: 'ft-us',
          measure: 'length',
          system: 'imperial',
          singular: 'US Survey Foot',
          plural: 'US Survey Feet'
        },
        {
          abbr: 'ft',
          measure: 'length',
          system: 'imperial',
          singular: 'Foot',
          plural: 'Feet'
        },
        {
          abbr: 'mi',
          measure: 'length',
          system: 'imperial',
          singular: 'Mile',
          plural: 'Miles'
        }
      ]
    },
    {
      type: 'area',
      list: [
        {
          abbr: 'mm2',
          measure: 'area',
          system: 'metric',
          singular: 'Square Millimeter',
          plural: 'Square Millimeters'
        },
        {
          abbr: 'cm2',
          measure: 'area',
          system: 'metric',
          singular: 'Centimeter',
          plural: 'Centimeters'
        },
        {
          abbr: 'm2',
          measure: 'area',
          system: 'metric',
          singular: 'Square Meter',
          plural: 'Square Meters'
        },
        {
          abbr: 'ha',
          measure: 'area',
          system: 'metric',
          singular: 'Hectare',
          plural: 'Hectares'
        },
        {
          abbr: 'km2',
          measure: 'area',
          system: 'metric',
          singular: 'Square Kilometer',
          plural: 'Square Kilometers'
        },
        {
          abbr: 'in2',
          measure: 'area',
          system: 'imperial',
          singular: 'Square Inch',
          plural: 'Square Inches'
        },
        {
          abbr: 'yd2',
          measure: 'area',
          system: 'imperial',
          singular: 'Square Yard',
          plural: 'Square Yards'
        },
        {
          abbr: 'ft2',
          measure: 'area',
          system: 'imperial',
          singular: 'Square Foot',
          plural: 'Square Feet'
        },
        {
          abbr: 'ac',
          measure: 'area',
          system: 'imperial',
          singular: 'Acre',
          plural: 'Acres'
        },
        {
          abbr: 'mi2',
          measure: 'area',
          system: 'imperial',
          singular: 'Square Mile',
          plural: 'Square Miles'
        }
      ]
    },
    {
      type: 'mass',
      list: [
        {
          abbr: 'mcg',
          measure: 'mass',
          system: 'metric',
          singular: 'Microgram',
          plural: 'Micrograms'
        },
        {
          abbr: 'mg',
          measure: 'mass',
          system: 'metric',
          singular: 'Milligram',
          plural: 'Milligrams'
        },
        {
          abbr: 'g',
          measure: 'mass',
          system: 'metric',
          singular: 'Gram',
          plural: 'Grams'
        },
        {
          abbr: 'kg',
          measure: 'mass',
          system: 'metric',
          singular: 'Kilogram',
          plural: 'Kilograms'
        },
        {
          abbr: 'mt',
          measure: 'mass',
          system: 'metric',
          singular: 'Metric Tonne',
          plural: 'Metric Tonnes'
        },
        {
          abbr: 'oz',
          measure: 'mass',
          system: 'imperial',
          singular: 'Ounce',
          plural: 'Ounces'
        },
        {
          abbr: 'lb',
          measure: 'mass',
          system: 'imperial',
          singular: 'Pound',
          plural: 'Pounds'
        },
        {
          abbr: 't',
          measure: 'mass',
          system: 'imperial',
          singular: 'Ton',
          plural: 'Tons'
        }
      ]
    },
    {
      type: 'volume',
      list: [
        {
          abbr: 'mm3',
          measure: 'volume',
          system: 'metric',
          singular: 'Cubic Millimeter',
          plural: 'Cubic Millimeters'
        },
        {
          abbr: 'cm3',
          measure: 'volume',
          system: 'metric',
          singular: 'Cubic Centimeter',
          plural: 'Cubic Centimeters'
        },
        {
          abbr: 'ml',
          measure: 'volume',
          system: 'metric',
          singular: 'Millilitre',
          plural: 'Millilitres'
        },
        {
          abbr: 'cl',
          measure: 'volume',
          system: 'metric',
          singular: 'Centilitre',
          plural: 'Centilitres'
        },
        {
          abbr: 'dl',
          measure: 'volume',
          system: 'metric',
          singular: 'Decilitre',
          plural: 'Decilitres'
        },
        {
          abbr: 'l',
          measure: 'volume',
          system: 'metric',
          singular: 'Litre',
          plural: 'Litres'
        },
        {
          abbr: 'kl',
          measure: 'volume',
          system: 'metric',
          singular: 'Kilolitre',
          plural: 'Kilolitres'
        },
        {
          abbr: 'm3',
          measure: 'volume',
          system: 'metric',
          singular: 'Cubic meter',
          plural: 'Cubic meters'
        },
        {
          abbr: 'km3',
          measure: 'volume',
          system: 'metric',
          singular: 'Cubic kilometer',
          plural: 'Cubic kilometers'
        },
        {
          abbr: 'krm',
          measure: 'volume',
          system: 'metric',
          singular: 'Matsked',
          plural: 'Matskedar'
        },
        {
          abbr: 'tsk',
          measure: 'volume',
          system: 'metric',
          singular: 'Tesked',
          plural: 'Teskedar'
        },
        {
          abbr: 'msk',
          measure: 'volume',
          system: 'metric',
          singular: 'Matsked',
          plural: 'Matskedar'
        },
        {
          abbr: 'kkp',
          measure: 'volume',
          system: 'metric',
          singular: 'Kaffekopp',
          plural: 'Kaffekoppar'
        },
        {
          abbr: 'glas',
          measure: 'volume',
          system: 'metric',
          singular: 'Glas',
          plural: 'Glas'
        },
        {
          abbr: 'kanna',
          measure: 'volume',
          system: 'metric',
          singular: 'Kanna',
          plural: 'Kannor'
        },
        {
          abbr: 'tsp',
          measure: 'volume',
          system: 'imperial',
          singular: 'Teaspoon',
          plural: 'Teaspoons'
        },
        {
          abbr: 'Tbs',
          measure: 'volume',
          system: 'imperial',
          singular: 'Tablespoon',
          plural: 'Tablespoons'
        },
        {
          abbr: 'in3',
          measure: 'volume',
          system: 'imperial',
          singular: 'Cubic inch',
          plural: 'Cubic inches'
        },
        {
          abbr: 'fl-oz',
          measure: 'volume',
          system: 'imperial',
          singular: 'Fluid Ounce',
          plural: 'Fluid Ounces'
        },
        {
          abbr: 'cup',
          measure: 'volume',
          system: 'imperial',
          singular: 'Cup',
          plural: 'Cups'
        },
        {
          abbr: 'pnt',
          measure: 'volume',
          system: 'imperial',
          singular: 'Pint',
          plural: 'Pints'
        },
        {
          abbr: 'qt',
          measure: 'volume',
          system: 'imperial',
          singular: 'Quart',
          plural: 'Quarts'
        },
        {
          abbr: 'gal',
          measure: 'volume',
          system: 'imperial',
          singular: 'Gallon',
          plural: 'Gallons'
        },
        {
          abbr: 'ft3',
          measure: 'volume',
          system: 'imperial',
          singular: 'Cubic foot',
          plural: 'Cubic feet'
        },
        {
          abbr: 'yd3',
          measure: 'volume',
          system: 'imperial',
          singular: 'Cubic yard',
          plural: 'Cubic yards'
        }
      ]
    },
    {
      type: 'each',
      list: [
        {
          abbr: 'ea',
          measure: 'each',
          system: 'metric',
          singular: 'Each',
          plural: 'Each'
        },
        {
          abbr: 'dz',
          measure: 'each',
          system: 'metric',
          singular: 'Dozen',
          plural: 'Dozens'
        }
      ]
    },
    {
      type: 'temperature',
      list: [
        {
          abbr: 'C',
          measure: 'temperature',
          system: 'metric',
          singular: 'degree Celsius',
          plural: 'degrees Celsius'
        },
        {
          abbr: 'K',
          measure: 'temperature',
          system: 'metric',
          singular: 'degree Kelvin',
          plural: 'degrees Kelvin'
        },
        {
          abbr: 'F',
          measure: 'temperature',
          system: 'imperial',
          singular: 'degree Fahrenheit',
          plural: 'degrees Fahrenheit'
        },
        {
          abbr: 'R',
          measure: 'temperature',
          system: 'imperial',
          singular: 'degree Rankine',
          plural: 'degrees Rankine'
        }
      ]
    },
    {
      type: 'time',
      list: [
        {
          abbr: 'ns',
          measure: 'time',
          system: 'metric',
          singular: 'Nanosecond',
          plural: 'Nanoseconds'
        },
        {
          abbr: 'mu',
          measure: 'time',
          system: 'metric',
          singular: 'Microsecond',
          plural: 'Microseconds'
        },
        {
          abbr: 'ms',
          measure: 'time',
          system: 'metric',
          singular: 'Millisecond',
          plural: 'Milliseconds'
        },
        {
          abbr: 's',
          measure: 'time',
          system: 'metric',
          singular: 'Second',
          plural: 'Seconds'
        },
        {
          abbr: 'min',
          measure: 'time',
          system: 'metric',
          singular: 'Minute',
          plural: 'Minutes'
        },
        {
          abbr: 'h',
          measure: 'time',
          system: 'metric',
          singular: 'Hour',
          plural: 'Hours'
        },
        {
          abbr: 'd',
          measure: 'time',
          system: 'metric',
          singular: 'Day',
          plural: 'Days'
        },
        {
          abbr: 'week',
          measure: 'time',
          system: 'metric',
          singular: 'Week',
          plural: 'Weeks'
        },
        {
          abbr: 'month',
          measure: 'time',
          system: 'metric',
          singular: 'Month',
          plural: 'Months'
        },
        {
          abbr: 'year',
          measure: 'time',
          system: 'metric',
          singular: 'Year',
          plural: 'Years'
        }
      ]
    },
    {
      type: 'digital',
      list: [
        {
          abbr: 'b',
          measure: 'digital',
          system: 'bits',
          singular: 'Bit',
          plural: 'Bits'
        },
        {
          abbr: 'Kb',
          measure: 'digital',
          system: 'bits',
          singular: 'Kilobit',
          plural: 'Kilobits'
        },
        {
          abbr: 'Mb',
          measure: 'digital',
          system: 'bits',
          singular: 'Megabit',
          plural: 'Megabits'
        },
        {
          abbr: 'Gb',
          measure: 'digital',
          system: 'bits',
          singular: 'Gigabit',
          plural: 'Gigabits'
        },
        {
          abbr: 'Tb',
          measure: 'digital',
          system: 'bits',
          singular: 'Terabit',
          plural: 'Terabits'
        },
        {
          abbr: 'B',
          measure: 'digital',
          system: 'bytes',
          singular: 'Byte',
          plural: 'Bytes'
        },
        {
          abbr: 'KB',
          measure: 'digital',
          system: 'bytes',
          singular: 'Kilobyte',
          plural: 'Kilobytes'
        },
        {
          abbr: 'MB',
          measure: 'digital',
          system: 'bytes',
          singular: 'Megabyte',
          plural: 'Megabytes'
        },
        {
          abbr: 'GB',
          measure: 'digital',
          system: 'bytes',
          singular: 'Gigabyte',
          plural: 'Gigabytes'
        },
        {
          abbr: 'TB',
          measure: 'digital',
          system: 'bytes',
          singular: 'Terabyte',
          plural: 'Terabytes'
        }
      ]
    },
    {
      type: 'partsPer',
      list: [
        {
          abbr: 'ppm',
          measure: 'partsPer',
          system: 'metric',
          singular: 'Part-per Million',
          plural: 'Parts-per Million'
        },
        {
          abbr: 'ppb',
          measure: 'partsPer',
          system: 'metric',
          singular: 'Part-per Billion',
          plural: 'Parts-per Billion'
        },
        {
          abbr: 'ppt',
          measure: 'partsPer',
          system: 'metric',
          singular: 'Part-per Trillion',
          plural: 'Parts-per Trillion'
        },
        {
          abbr: 'ppq',
          measure: 'partsPer',
          system: 'metric',
          singular: 'Part-per Quadrillion',
          plural: 'Parts-per Quadrillion'
        }
      ]
    },
    {
      type: 'speed',
      list: [
        {
          abbr: 'm/s',
          measure: 'speed',
          system: 'metric',
          singular: 'Metre per second',
          plural: 'Metres per second'
        },
        {
          abbr: 'km/h',
          measure: 'speed',
          system: 'metric',
          singular: 'Kilometre per hour',
          plural: 'Kilometres per hour'
        },
        {
          abbr: 'm/h',
          measure: 'speed',
          system: 'imperial',
          singular: 'Mile per hour',
          plural: 'Miles per hour'
        },
        {
          abbr: 'knot',
          measure: 'speed',
          system: 'imperial',
          singular: 'Knot',
          plural: 'Knots'
        },
        {
          abbr: 'ft/s',
          measure: 'speed',
          system: 'imperial',
          singular: 'Foot per second',
          plural: 'Feet per second'
        }
      ]
    },
    {
      type: 'pace',
      list: [
        {
          abbr: 'min/km',
          measure: 'pace',
          system: 'metric',
          singular: 'Minute per kilometre',
          plural: 'Minutes per kilometre'
        },
        {
          abbr: 's/m',
          measure: 'pace',
          system: 'metric',
          singular: 'Second per metre',
          plural: 'Seconds per metre'
        },
        {
          abbr: 'min/mi',
          measure: 'pace',
          system: 'imperial',
          singular: 'Minute per mile',
          plural: 'Minutes per mile'
        },
        {
          abbr: 's/ft',
          measure: 'pace',
          system: 'imperial',
          singular: 'Second per foot',
          plural: 'Seconds per foot'
        }
      ]
    },
    {
      type: 'pressure',
      list: [
        {
          abbr: 'Pa',
          measure: 'pressure',
          system: 'metric',
          singular: 'pascal',
          plural: 'pascals'
        },
        {
          abbr: 'kPa',
          measure: 'pressure',
          system: 'metric',
          singular: 'kilopascal',
          plural: 'kilopascals'
        },
        {
          abbr: 'MPa',
          measure: 'pressure',
          system: 'metric',
          singular: 'megapascal',
          plural: 'megapascals'
        },
        {
          abbr: 'hPa',
          measure: 'pressure',
          system: 'metric',
          singular: 'hectopascal',
          plural: 'hectopascals'
        },
        {
          abbr: 'bar',
          measure: 'pressure',
          system: 'metric',
          singular: 'bar',
          plural: 'bar'
        },
        {
          abbr: 'torr',
          measure: 'pressure',
          system: 'metric',
          singular: 'torr',
          plural: 'torr'
        },
        {
          abbr: 'psi',
          measure: 'pressure',
          system: 'imperial',
          singular: 'pound per square inch',
          plural: 'pounds per square inch'
        },
        {
          abbr: 'ksi',
          measure: 'pressure',
          system: 'imperial',
          singular: 'kilopound per square inch',
          plural: 'kilopound per square inch'
        }
      ]
    },
    {
      type: 'current',
      list: [
        {
          abbr: 'A',
          measure: 'current',
          system: 'metric',
          singular: 'Ampere',
          plural: 'Amperes'
        },
        {
          abbr: 'mA',
          measure: 'current',
          system: 'metric',
          singular: 'Milliampere',
          plural: 'Milliamperes'
        },
        {
          abbr: 'kA',
          measure: 'current',
          system: 'metric',
          singular: 'Kiloampere',
          plural: 'Kiloamperes'
        }
      ]
    },
    {
      type: 'voltage',
      list: [
        {
          abbr: 'V',
          measure: 'voltage',
          system: 'metric',
          singular: 'Volt',
          plural: 'Volts'
        },
        {
          abbr: 'mV',
          measure: 'voltage',
          system: 'metric',
          singular: 'Millivolt',
          plural: 'Millivolts'
        },
        {
          abbr: 'kV',
          measure: 'voltage',
          system: 'metric',
          singular: 'Kilovolt',
          plural: 'Kilovolts'
        }
      ]
    },
    {
      type: 'power',
      list: [
        {
          abbr: 'W',
          measure: 'power',
          system: 'metric',
          singular: 'Watt',
          plural: 'Watts'
        },
        {
          abbr: 'mW',
          measure: 'power',
          system: 'metric',
          singular: 'Milliwatt',
          plural: 'Milliwatts'
        },
        {
          abbr: 'kW',
          measure: 'power',
          system: 'metric',
          singular: 'Kilowatt',
          plural: 'Kilowatts'
        },
        {
          abbr: 'MW',
          measure: 'power',
          system: 'metric',
          singular: 'Megawatt',
          plural: 'Megawatts'
        },
        {
          abbr: 'GW',
          measure: 'power',
          system: 'metric',
          singular: 'Gigawatt',
          plural: 'Gigawatts'
        }
      ]
    },
    {
      type: 'reactivePower',
      list: [
        {
          abbr: 'VAR',
          measure: 'reactivePower',
          system: 'metric',
          singular: 'Volt-Ampere Reactive',
          plural: 'Volt-Amperes Reactive'
        },
        {
          abbr: 'mVAR',
          measure: 'reactivePower',
          system: 'metric',
          singular: 'Millivolt-Ampere Reactive',
          plural: 'Millivolt-Amperes Reactive'
        },
        {
          abbr: 'kVAR',
          measure: 'reactivePower',
          system: 'metric',
          singular: 'Kilovolt-Ampere Reactive',
          plural: 'Kilovolt-Amperes Reactive'
        },
        {
          abbr: 'MVAR',
          measure: 'reactivePower',
          system: 'metric',
          singular: 'Megavolt-Ampere Reactive',
          plural: 'Megavolt-Amperes Reactive'
        },
        {
          abbr: 'GVAR',
          measure: 'reactivePower',
          system: 'metric',
          singular: 'Gigavolt-Ampere Reactive',
          plural: 'Gigavolt-Amperes Reactive'
        }
      ]
    },
    {
      type: 'apparentPower',
      list: [
        {
          abbr: 'VA',
          measure: 'apparentPower',
          system: 'metric',
          singular: 'Volt-Ampere',
          plural: 'Volt-Amperes'
        },
        {
          abbr: 'mVA',
          measure: 'apparentPower',
          system: 'metric',
          singular: 'Millivolt-Ampere',
          plural: 'Millivolt-Amperes'
        },
        {
          abbr: 'kVA',
          measure: 'apparentPower',
          system: 'metric',
          singular: 'Kilovolt-Ampere',
          plural: 'Kilovolt-Amperes'
        },
        {
          abbr: 'MVA',
          measure: 'apparentPower',
          system: 'metric',
          singular: 'Megavolt-Ampere',
          plural: 'Megavolt-Amperes'
        },
        {
          abbr: 'GVA',
          measure: 'apparentPower',
          system: 'metric',
          singular: 'Gigavolt-Ampere',
          plural: 'Gigavolt-Amperes'
        }
      ]
    },
    {
      type: 'energy',
      list: [
        {
          abbr: 'Wh',
          measure: 'energy',
          system: 'metric',
          singular: 'Watt-hour',
          plural: 'Watt-hours'
        },
        {
          abbr: 'mWh',
          measure: 'energy',
          system: 'metric',
          singular: 'Milliwatt-hour',
          plural: 'Milliwatt-hours'
        },
        {
          abbr: 'kWh',
          measure: 'energy',
          system: 'metric',
          singular: 'Kilowatt-hour',
          plural: 'Kilowatt-hours'
        },
        {
          abbr: 'MWh',
          measure: 'energy',
          system: 'metric',
          singular: 'Megawatt-hour',
          plural: 'Megawatt-hours'
        },
        {
          abbr: 'GWh',
          measure: 'energy',
          system: 'metric',
          singular: 'Gigawatt-hour',
          plural: 'Gigawatt-hours'
        },
        {
          abbr: 'J',
          measure: 'energy',
          system: 'metric',
          singular: 'Joule',
          plural: 'Joules'
        },
        {
          abbr: 'kJ',
          measure: 'energy',
          system: 'metric',
          singular: 'Kilojoule',
          plural: 'Kilojoules'
        }
      ]
    },
    {
      type: 'reactiveEnergy',
      list: [
        {
          abbr: 'VARh',
          measure: 'reactiveEnergy',
          system: 'metric',
          singular: 'Volt-Ampere Reactive Hour',
          plural: 'Volt-Amperes Reactive Hour'
        },
        {
          abbr: 'mVARh',
          measure: 'reactiveEnergy',
          system: 'metric',
          singular: 'Millivolt-Ampere Reactive Hour',
          plural: 'Millivolt-Amperes Reactive Hour'
        },
        {
          abbr: 'kVARh',
          measure: 'reactiveEnergy',
          system: 'metric',
          singular: 'Kilovolt-Ampere Reactive Hour',
          plural: 'Kilovolt-Amperes Reactive Hour'
        },
        {
          abbr: 'MVARh',
          measure: 'reactiveEnergy',
          system: 'metric',
          singular: 'Megavolt-Ampere Reactive Hour',
          plural: 'Megavolt-Amperes Reactive Hour'
        },
        {
          abbr: 'GVARh',
          measure: 'reactiveEnergy',
          system: 'metric',
          singular: 'Gigavolt-Ampere Reactive Hour',
          plural: 'Gigavolt-Amperes Reactive Hour'
        }
      ]
    },
    {
      type: 'volumeFlowRate',
      list: [
        {
          abbr: 'mm3/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Cubic Millimeter per second',
          plural: 'Cubic Millimeters per second'
        },
        {
          abbr: 'cm3/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Cubic Centimeter per second',
          plural: 'Cubic Centimeters per second'
        },
        {
          abbr: 'ml/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Millilitre per second',
          plural: 'Millilitres per second'
        },
        {
          abbr: 'cl/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Centilitre per second',
          plural: 'Centilitres per second'
        },
        {
          abbr: 'dl/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Decilitre per second',
          plural: 'Decilitres per second'
        },
        {
          abbr: 'l/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Litre per second',
          plural: 'Litres per second'
        },
        {
          abbr: 'l/min',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Litre per minute',
          plural: 'Litres per minute'
        },
        {
          abbr: 'l/h',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Litre per hour',
          plural: 'Litres per hour'
        },
        {
          abbr: 'kl/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Kilolitre per second',
          plural: 'Kilolitres per second'
        },
        {
          abbr: 'kl/min',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Kilolitre per minute',
          plural: 'Kilolitres per minute'
        },
        {
          abbr: 'kl/h',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Kilolitre per hour',
          plural: 'Kilolitres per hour'
        },
        {
          abbr: 'm3/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Cubic meter per second',
          plural: 'Cubic meters per second'
        },
        {
          abbr: 'm3/min',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Cubic meter per minute',
          plural: 'Cubic meters per minute'
        },
        {
          abbr: 'm3/h',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Cubic meter per hour',
          plural: 'Cubic meters per hour'
        },
        {
          abbr: 'km3/s',
          measure: 'volumeFlowRate',
          system: 'metric',
          singular: 'Cubic kilometer per second',
          plural: 'Cubic kilometers per second'
        },
        {
          abbr: 'tsp/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Teaspoon per second',
          plural: 'Teaspoons per second'
        },
        {
          abbr: 'Tbs/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Tablespoon per second',
          plural: 'Tablespoons per second'
        },
        {
          abbr: 'in3/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic inch per second',
          plural: 'Cubic inches per second'
        },
        {
          abbr: 'in3/min',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic inch per minute',
          plural: 'Cubic inches per minute'
        },
        {
          abbr: 'in3/h',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic inch per hour',
          plural: 'Cubic inches per hour'
        },
        {
          abbr: 'fl-oz/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Fluid Ounce per second',
          plural: 'Fluid Ounces per second'
        },
        {
          abbr: 'fl-oz/min',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Fluid Ounce per minute',
          plural: 'Fluid Ounces per minute'
        },
        {
          abbr: 'fl-oz/h',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Fluid Ounce per hour',
          plural: 'Fluid Ounces per hour'
        },
        {
          abbr: 'cup/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cup per second',
          plural: 'Cups per second'
        },
        {
          abbr: 'pnt/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Pint per second',
          plural: 'Pints per second'
        },
        {
          abbr: 'pnt/min',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Pint per minute',
          plural: 'Pints per minute'
        },
        {
          abbr: 'pnt/h',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Pint per hour',
          plural: 'Pints per hour'
        },
        {
          abbr: 'qt/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Quart per second',
          plural: 'Quarts per second'
        },
        {
          abbr: 'gal/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Gallon per second',
          plural: 'Gallons per second'
        },
        {
          abbr: 'gal/min',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Gallon per minute',
          plural: 'Gallons per minute'
        },
        {
          abbr: 'gal/h',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Gallon per hour',
          plural: 'Gallons per hour'
        },
        {
          abbr: 'ft3/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic foot per second',
          plural: 'Cubic feet per second'
        },
        {
          abbr: 'ft3/min',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic foot per minute',
          plural: 'Cubic feet per minute'
        },
        {
          abbr: 'ft3/h',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic foot per hour',
          plural: 'Cubic feet per hour'
        },
        {
          abbr: 'yd3/s',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic yard per second',
          plural: 'Cubic yards per second'
        },
        {
          abbr: 'yd3/min',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic yard per minute',
          plural: 'Cubic yards per minute'
        },
        {
          abbr: 'yd3/h',
          measure: 'volumeFlowRate',
          system: 'imperial',
          singular: 'Cubic yard per hour',
          plural: 'Cubic yards per hour'
        }
      ]
    },
    {
      type: 'illuminance',
      list: [
        {
          abbr: 'lx',
          measure: 'illuminance',
          system: 'metric',
          singular: 'Lux',
          plural: 'Lux'
        },
        {
          abbr: 'ft-cd',
          measure: 'illuminance',
          system: 'imperial',
          singular: 'Foot-candle',
          plural: 'Foot-candles'
        }
      ]
    },
    {
      type: 'frequency',
      list: [
        {
          abbr: 'mHz',
          measure: 'frequency',
          system: 'metric',
          singular: 'millihertz',
          plural: 'millihertz'
        },
        {
          abbr: 'Hz',
          measure: 'frequency',
          system: 'metric',
          singular: 'hertz',
          plural: 'hertz'
        },
        {
          abbr: 'kHz',
          measure: 'frequency',
          system: 'metric',
          singular: 'kilohertz',
          plural: 'kilohertz'
        },
        {
          abbr: 'MHz',
          measure: 'frequency',
          system: 'metric',
          singular: 'megahertz',
          plural: 'megahertz'
        },
        {
          abbr: 'GHz',
          measure: 'frequency',
          system: 'metric',
          singular: 'gigahertz',
          plural: 'gigahertz'
        },
        {
          abbr: 'THz',
          measure: 'frequency',
          system: 'metric',
          singular: 'terahertz',
          plural: 'terahertz'
        },
        {
          abbr: 'rpm',
          measure: 'frequency',
          system: 'metric',
          singular: 'rotation per minute',
          plural: 'rotations per minute'
        },
        {
          abbr: 'deg/s',
          measure: 'frequency',
          system: 'metric',
          singular: 'degree per second',
          plural: 'degrees per second'
        },
        {
          abbr: 'rad/s',
          measure: 'frequency',
          system: 'metric',
          singular: 'radian per second',
          plural: 'radians per second'
        }
      ]
    },
    {
      type: 'angle',
      list: [
        {
          abbr: 'rad',
          measure: 'angle',
          system: 'metric',
          singular: 'radian',
          plural: 'radians'
        },
        {
          abbr: 'deg',
          measure: 'angle',
          system: 'metric',
          singular: 'degree',
          plural: 'degrees'
        },
        {
          abbr: 'grad',
          measure: 'angle',
          system: 'metric',
          singular: 'gradian',
          plural: 'gradians'
        },
        {
          abbr: 'arcmin',
          measure: 'angle',
          system: 'metric',
          singular: 'arcminute',
          plural: 'arcminutes'
        },
        {
          abbr: 'arcsec',
          measure: 'angle',
          system: 'metric',
          singular: 'arcsecond',
          plural: 'arcseconds'
        }
      ]
    }
  ];

  constructor() {}

  convert(data?) {
    return convert(data);
  }

}
