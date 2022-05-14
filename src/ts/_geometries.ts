/**
 * Geometry Classes
 */
class BoxGeo {
  _geoData = {
    width: 1,
    height: 1,
    depth: 1,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  };
  _geo;
  _mater;
  _mesh;
  _gui;
  _three;

  constructor(THREE: any, scene: any, gui: any) {
    this._three = THREE;
    this._gui = gui;
    this._geo = new this._three.BoxGeometry(
      this._geoData.width,
      this._geoData.height,
      this._geoData.depth,
      this._geoData.widthSegments,
      this._geoData.heightSegments,
      this._geoData.depthSegments
    );
    this._mater = new this._three.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    this._mesh = new this._three.Mesh(this._geo, this._mater);

    this._createGeometry(scene, this._mesh);

    this._setGui(this._gui);
  }

  _createGeometry(scene: any, mesh: any) {
    scene.add(mesh);
  }

  _recreateGeometry() {
    // console.log(this._mesh);
    this._mesh.geometry.dispose();
    this._mesh.geometry = new this._three.BoxGeometry(
      this._geoData.width,
      this._geoData.height,
      this._geoData.depth,
      this._geoData.widthSegments,
      this._geoData.heightSegments,
      this._geoData.depthSegments
    );
  }

  _setGui(gui: any) {
    const folder = gui.addFolder("Box Geometry");
    folder
      .add(this._geoData, "width", 0, 5)
      .onChange(this._recreateGeometry.bind(this));
    folder
      .add(this._geoData, "height", 0, 5)
      .onChange(this._recreateGeometry.bind(this));
    folder
      .add(this._geoData, "depth", 0, 5)
      .onChange(this._recreateGeometry.bind(this));
    folder
      .add(this._geoData, "widthSegments", 0, 5)
      .step(1)
      .onChange(this._recreateGeometry.bind(this));
    folder
      .add(this._geoData, "heightSegments", 0, 5)
      .step(1)
      .onChange(this._recreateGeometry.bind(this));
    folder
      .add(this._geoData, "depthSegments", 0, 5)
      .step(1)
      .onChange(this._recreateGeometry.bind(this));
  }
}

export { BoxGeo };
