
declare function vegaEmbed(id: Node | String, spec: any): Promise<any>;

import { TopLevelSpec, Config } from "vega-lite";
import * as d3 from "d3";
import * as L from "leaflet";
import * as GeoJSON from "geojson";
import * as T from "turf";
import { config_object, palette } from "./defaults"

// let tract_data = d3.dsv("|", "algorex_mn_tract_out.csv");
let county_geojson = d3.json("static/data/gz_2010_us_050_00_500k.json");



function make_map(county_geojson: GeoJSON.GeoJsonObject) {
    let map_elem = document.getElementById("mapid");
    var mymap = L.map(map_elem).setView([44.33, -85.60], 6);
    let tiles = L.tileLayer('https://api.mapbox.com/styles/v1/kindofluke/ckfztxr661mii19qxnw787no4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia2luZG9mbHVrZSIsImEiOiJjaXd6MWdzOGwwMW9tMnVxcmE0ZDcyOGgxIn0.W9q1K32BDHApXe1vOkaLDw', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        // accessToken: 'pk.eyJ1Ijoia2luZG9mbHVrZSIsImEiOiJjaXd6MWdzOGwwMW9tMnVxcmE0ZDcyOGgxIn0.W9q1K32BDHApXe1vOkaLDw'
    });

    let base_layers = {
        "Base Map": tiles
    }
    let overlay_layers = {

        'US Counties': geo_json_make_layer('CENSUSAREA', county_geojson)
    }
    L.control.layers(base_layers, overlay_layers).addTo(mymap);
    tiles.addTo(mymap);
    overlay_layers["US Counties"].addTo(mymap);

}

county_geojson.then(result => {
    let t = result as GeoJSON.GeoJsonObject;
    make_map(t);
    make_build_chart(t);



})
function geo_json_make_layer(column: string, county_geojson: any): L.GeoJSON {
    let column_range = (county_geojson as GeoJSON.FeatureCollection).features.map(ft => { return ft.properties[column] })
    let scale = d3.scaleQuantile<string>().domain(column_range).range(d3.schemeBuPu[4]);
    return L.geoJSON(county_geojson as GeoJSON.GeoJsonObject, {
        style: function (feature) {
            return { color: scale(feature?.properties[column]) || "grey", fill: true, opacity: .75, fillOpacity: .75, stroke: false }
        }
    })
}

const measure_options = [null, 'Food', 'Housing',
    'Financial Support', 'Transportation', 'Health', 'Social Supports',
    'Goods', 'Behavioral Health', 'Family & Youth', 'Work', 'Education',
    'Legal', 'Emergency', 'In_Contracting', 'Qualified', 'Contracted', 'Target_Lead', 'MQL', 'All', 'Contracted_and_In_Contract',
    'Contracted_and_In_Contract_Qualified_MQL', 'Contracted_and_In_Contract_Qualified']

function make_build_chart(county_data: GeoJSON.GeoJsonObject) {

    let boston = {
        "type": "Feature",
        "name": "Boston",
        "geometry": {
            "type": "Point",
            "coordinates": [-71.0589, 42.3601]
        },
        "properties": {
            "name": "Boston"
        }
    }
    let center_points = (county_data as GeoJSON.FeatureCollection).features.map(
        ft => {
            let center = T.centroid(ft)
            center.properties["NAME"] = ft.properties["NAME"];
            return center
        }
    )
    let distances = center_points.map(ft => {
        return {
            "distance": T.distance((boston as GeoJSON.Feature<GeoJSON.Point>), ft, "miles"),
            "name": ft.properties["NAME"], "longitude": ft.geometry.coordinates[0] as number
        };
    })

    let spec: TopLevelSpec = {
        data: { values: distances },
        mark: { type: 'bar', stroke: "white", color: palette[0] },
        title: { text: "Histogram of Distances from Boston to other US County Centroids" },
        width: 400,
        encoding: {
            x: {
                bin: { maxbins: 20 },
                "field": "distance",
                "type": "quantitative",
                "title": "Distance from Boston"
            },
            y: {
                aggregate: "count",
                type: "quantitative",
                "title": "Number of Counties"
            }
        },
        config: config_object
    }
    vegaEmbed(`#vega_viz`, spec)
}

