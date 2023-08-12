import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  map         !:  mapboxgl.Map;
  mapMarkers  :   mapboxgl.Marker[] = [];
  markers     :   mapboxgl.LngLatLike[] | any = [];

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxApi;
    
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-0.37680965553121004, 39.467434152717075],
      zoom: 16
    });

    let markers = localStorage.getItem("markers");
    if(!markers) {
      this.markers = [];
      this.mapMarkers = [];
    }
    else {
      this.markers = JSON.parse(markers);
      this.markers.map((m: mapboxgl.LngLatLike) => {
        let marker = new mapboxgl.Marker({
          draggable: true
        });

        marker.getElement().addEventListener('click', (event) => {
          event.stopPropagation();
          alert("Clicked");
        });

        this.mapMarkers.push(
          marker.setLngLat(m).addTo(this.map)
        );
      });
    }

    this.map.on('click', this.add_marker.bind(this));
  }

  add_marker(event: any) {
    let marker = new mapboxgl.Marker({
      draggable: true
    });
    let coordinates = event.lngLat;

    marker.getElement().addEventListener('click', (event) => {
      event.stopPropagation();
      alert("Clicked");
    });
    marker.setLngLat(coordinates).addTo(this.map);

    this.markers.push(coordinates);
    localStorage.setItem("markers", JSON.stringify(this.markers));
  }
}
