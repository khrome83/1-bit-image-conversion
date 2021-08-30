import { reactive } from "vue";

const store = {
  debug: true,
  patternCount: 45,
  contexts: {
    original: null,
    color: null,
    bw: null,
    onebit: null,
  },
  blueprints: [],
  selected: [],
  graySegments: [],
  state: reactive({
    message: "Hello!",
    view: 'onebit',
    width: 400,
    height: 240,
    imageLoaded: false,
    palletsLoaded: false,
  }),

  setView(newValue) {
    if (this.debug) {
      console.log('setView triggered with ', newValue);
    }

    switch (newValue) {
      case 'color':
      case 'bw':
      case 'onebit':
        this.state.view = newValue;
        break;
      default:
        if (this.debug) {
          console.log('setView passed incorrect value ', newValue);
        }
    }

    this.process();
  },

  setCanvasDimensions(w, h) {
    if (this.debug) {
      console.log('setCanvasDimensions triggered with ', w, h);
    }

    this.state.width = w;
    this.state.height = h;
  },

  setImageLoaded(value) {
    if (this.debug) {
      console.log('setImageLoaded triggered with ', value);
    }

    this.state.imageLoaded = !!value;
  },

  setPalletsLoaded(value) {
    if (this.debug) {
      console.log('setPalletsLoaded triggered with ', value);
    }

    this.state.palletsLoaded = !!value;
  },

  addPalletSelection(id, src, dark) {
    const canvas = document.createElement("canvas");
    canvas.id = `template-${id}`;
    canvas.width = this.state.width;
    canvas.height = this.state.height;

    const ctx = canvas.getContext("2d");
    // Fill Pattern
    const imageObj = new Image();

    imageObj.onload = function () {
      const pattern = ctx.createPattern(imageObj, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      let imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      let data = imageData.data;

      // Add to Selected
      store.selected.push({
        id,
        src,
        data,
        dark,
      });

      // Sort
      store.selected.sort((a, b) => b.dark - a.dark);

      // Process
      store.process();
    };

    imageObj.src = src;
  },

  togglePalletSelection(id) {
    if (this.debug) {
      console.log("togglePalletSelection triggered with ", id);
    }
    const item = this.blueprints.find((x) => x.id === id);
    if (item.selected) {
      this.removePalletSelection(item.id);
    } else {
      this.addPalletSelection(item.id, item.src, item.dark);
    }
    item.selected = !item.selected;

    // Selection Changed, Process
    if (this.state.imageLoaded) {
      // Alpine.store("image").process();
    }
  },

  removePalletSelection(id) {
    if (this.debug) {
      console.log("removePalletSelection triggered with ", id);
    }

    this.selected = this.selected.filter((s) => s.id !== id)

     // Process
     store.process();
  },

  getBW(average, pos) {
    for (let i = 0; i < this.graySegments.length; i++) {
      if (average < this.graySegments[i + 1]) {
        const midpoint =
          (this.graySegments[i + 1] - this.graySegments[i]) / 2;

        // Determine Selection
        let select;
        if (average <= midpoint) {
          select = i;
        } else {
          select = i + 1;
        }

        return this.graySegments[select];
      }
    }

    return 255;
  },

  getOneBit(average, pos) {
    for (let i = 0; i < this.graySegments.length; i++) {
      if (average < this.graySegments[i + 1]) {
        const midpoint =
          (this.graySegments[i + 1] - this.graySegments[i]) / 2;

        // Determine Selection
        let select;
        if (average <= midpoint) {
          select = i;
        } else {
          select = i + 1;
        }

        // Retrieve Pixel Color
        let data = this.selected[select].data;
        let r = data[pos];
        let g = data[pos + 1];
        let b = data[pos + 2];
        let a = data[pos + 3];
        let avg = (r + g + b) / 3;

        // console.log(pos, r,g,b)

        if (avg < 127) {
          return 0;
        } else {
          return 255;
        }
      }
    }

    return 255;
  },

  renderColor() {
    // Get Image Data
    let imageData = this.contexts.original.getImageData(
      0,
      0,
      this.state.width,
      this.state.height
    );

    let data = imageData.data;

    // Draw Data Back
    this.contexts.color.putImageData(imageData, 0, 0);
  },

  renderBW() {
    console.log('bw', this.state.width, this.state.height)
    // Get Image Data
    let imageData = this.contexts.original.getImageData(
      0,
      0,
      this.state.width,
      this.state.height
    );

    let data = imageData.data;

    // Get Color of Pixel and Update
    for (let i = 0; i < data.length; i += 4) {
      // if (data[i + 3] < 2) continue; // DO WE NEED?!

      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const px = this.getBW(average, i);

      data[i] = px;
      data[i + 1] = px;
      data[i + 2] = px;
      data[i + 3] = 255;
    }

    // Draw Data Back
    this.contexts.bw.putImageData(imageData, 0, 0);
  },

  renderOneBit() {
    console.log('1bit', this.state.width, this.state.height)
    // Get Image Data
    let imageData = this.contexts.original.getImageData(
      0,
      0,
      this.state.width,
      this.state.height
    );

    let data = imageData.data;

    // Get Color of Pixel and Update
    for (let i = 0; i < data.length; i += 4) {
      // if (data[i + 3] < 2) continue; // DO WE NEED?!

      const average = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const px = this.getOneBit(average, i);

      data[i] = px;
      data[i + 1] = px;
      data[i + 2] = px;
      data[i + 3] = 255;
    }

    // Draw Data Back
    this.contexts.onebit.putImageData(imageData, 0, 0);
  },

  process() {
    if (this.debug) {
      console.log("in process, image loaded", this.state.imageLoaded);
    }

    if (!this.state.imageLoaded) {
      return;
    }

    // Init Grays and Conversion Factor
    let cf = 255 / (this.selected.length - 1);
    
    // Build Grays
    const grays = [0];
    for (let i = cf; i <= 255; i += cf) {
      grays.push(i);
    }
    this.graySegments = grays;

    switch(this.state.view) {
      case 'color':
        this.renderColor();
        break;
      case 'bw':
        this.renderBW();
        break;
      case 'onebit':
        this.renderOneBit();
        break;
    }
  }
};

export default store;