import { Config } from "vega-lite";
export const palette = [
   "#973b86",
   "#072242",
   "#273878",
   "#607cad",
   "#62a04e",
   "#ca4b40",
   "#de944a",
   "#d0c247",
   "#6b6b5a",
   "#9d9d90",
]

const fonts = ['Georgia', 'Univers LT Pro']


export const config_object: Config = ({
   "axisY": {
      "ticks": false,

      "labelPadding": 8,
      "titleAnchor": "middle"
   },
   "axis": {
      "titleColor": "#919084",
      "grid": false,
      "domainColor": "#6b6b5a",
      "domainWidth": .5,
      "titleFont": "fonts"[
         1
      ],
      "titleFontSize": 13,
      "titleFontWeight": 900,
      "labelColor": "#919084"
   },
   "axisX": {
      "labels": true,
      "tickCount": 3,
      "tickSize": 10,
      "ticks": false,
      "tickWidth": 1,
      "tickColor": "#919084",
      "tickOpacity": 1,
      "labelFontWeight": 900,
      "labelColor": "#919084",
      "labelPadding": 8,
      "titleAnchor": "end",
      "tickExtra": true
   },
   "font": "fonts"[
      1
   ],
   "title": {
      "fontSize": 20,
      "color": "#555",
      "font": "fonts"[
         1
      ],
      "fontWeight": 900,
      //    "titleAlign":"right"
   },
   "range": { "category": palette },
   "legend": {
      "labelFontSize": 12,
      "titleFontSize": 14,
      "titleFontWeight": 100,
      "labelColor": "#919084",
      "titleColor": "#919084",
      //    "titleFontWeight":900,
      "titleFont": "fonts"[
         1
      ]
   },
   "point": { "filled": true, "color": "#072242", size: 90 },
   "bar": {
      strokeOpacity: .75, "cornerRadiusEnd": 5,
      //    "cornerRadiusStart": 0, 
      color: "#DC8F41", opacity: 0.75, size: 25
   },
   "rule": { strokeWidth: .5, color: palette[0] }
})