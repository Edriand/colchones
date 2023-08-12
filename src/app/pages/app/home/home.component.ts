import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxApi;
    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-0.37680965553121004, 39.467434152717075],
      zoom: 16
    });

    this.marker = new mapboxgl.Marker({
      draggable: true
    });
    
    this.map.on('click', this.add_marker.bind(this));
  }

  add_marker(event: any) {
    var coordinates = event.lngLat;
    this.marker.setLngLat(coordinates).addTo(this.map);
  }
}
