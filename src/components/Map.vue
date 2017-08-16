<template lang="html">
  <div>
    <div>
      w:
      <input type="text" v-model="width"></button>
      h:
      <input type="text" v-model="height"></button>
      <button v-on:click="init()">init</button>
    </div>
    <div>
      step:
      <input type="text" v-model="count"></button>
      <button v-on:click="execute()">execute</button>
    </div>
    <table>
      <tr v-for="line in cells">
        <td v-for="cell in line">
          <div class="cell" v-bind:style="cell.getStyle()">
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Cell from '@/model/Cell';

export default {
  data () {
    return {
      width: 10,
      height: 10,
      count: 1000,
      cells: []
    };
  },
  created () {
    this.init();
  },
  methods: {
    init: function () {
      this.cells = [];
      for (let y = 0; y < this.height; y++) {
        this.cells.push([]);
        for (let x = 0; x < this.width; x++) {
          this.cells[y].push(new Cell());
        }
      }
    },
    execute: function () {
      for (let i = 0; i < this.count; i++) {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let bmu = this.searchBMU(r, g, b);
        this.expose(bmu, r, g, b);
      }
    },
    searchBMU: function (r, g, b) {
      let bmu = {
        x: 0,
        y: 0,
        distance: this.cells[0][0].calcColorDistance(r, g, b)
      };
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let distance = this.cells[y][x].calcColorDistance(r, g, b);
          if (distance < bmu.distance) {
            bmu.x = x;
            bmu.y = y;
            bmu.distance = distance;
          }
          if (distance === 0) {
            break;
          }
        }
      }
      return bmu;
    },
    expose: function (bmu, r, g, b) {
      for (let h = -1; h <= 1; h++) {
        for (let w = -1; w <= 1; w++) {
          let x = Math.min(Math.max(bmu.x + w, 0), this.width - 1);
          let y = Math.min(Math.max(bmu.y + h, 0), this.height - 1);
          this.cells[y][x].mixColor(r, g, b, 0.1);
        }
      }
    }
  }
};
</script>

<style lang="css">
  .cell {
    height: 1em;
    width: 1em;
  }
</style>
