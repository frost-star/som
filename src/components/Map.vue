<template lang="html">
  <table>
    <tr v-for="line in cells">
      <td v-for="cell in line">
        <div class="cell" v-bind:style="cell.getStyle()">
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import Cell from '@/model/Cell';

export default {
  data () {
    return {
      width: 0,
      height: 0,
      cells: []
    };
  },
  created () {
    this.init(10, 10);
  },
  methods: {
    init: function (width, height) {
      this.width = width;
      this.height = height;
      for (let y = 0; y < this.height; y++) {
        this.cells[y] = [];
        for (let x = 0; x < this.width; x++) {
          this.cells[y][x] = new Cell();
        }
      }
      this.execute(1000);
    },
    execute: function (count) {
      for (let i = 0; i < count; i++) {
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
        distance: this.cells[0][0].caclColorDistance(r, g, b)
      };
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let distance = this.cells[y][x].caclColorDistance(r, g, b);
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
