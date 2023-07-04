const colors = ["#0A4247", "#8C2F0D", "#F2A057", "#F2C185", "#8CB7B8"];
const shootingStarColors = ["#F2C185", "#8CB7B8"];

const ShootingStar = {
  template:
    '<g><g class="star" v-if="shoot"><path :style="`transform: translate(${x}%, ${y}%)`" class="shootingStar" :d="`M 0 0 q ${80 + arcOffset} ${80 - arcOffset} 160 160`" :stroke="color" fill="transparent" stroke-dasharray="227.62" stroke-dashoffset="227.62" stroke-width="2" stroke-linecap="round"/></g></g>',
  data() {
    return {
      shoot: false,
      x: 50,
      y: 50,
      arcOffset: 0,
      color: ""
    };
  },
  methods: {
    shootAStar() {
      if (Math.random() < 0.2) {
        this.x = Math.random() * 100;
        this.y = Math.random() * 100;
        this.arcOffset = Math.random() * 60 - 30;
        this.color =
          shootingStarColors[Math.floor(Math.random() * colors.length)];
        this.shoot = true;
        setTimeout(() => {
          this.shoot = false;
        }, 600);
      }
    }
  },
  mounted() {
    setInterval(this.shootAStar, 700);
  }
};

const Star = {
  template:
    '<g><circle class="star" :cx="`${x}%`" :cy="`${y}%`" :r="r" :fill="color"/><circle class="star" :cx="`${x + 100}%`" :cy="`${y - 100}%`" :r="r" :fill="color"/><circle class="star" :cx="`${x}%`" :cy="`${y - 100}%`" :r="r" :fill="color"/><circle class="star" :cx="`${x + 100}%`" :cy="`${y}%`" :r="r" :fill="color"/></g>',
  data() {
    return {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      r: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }
};

// const DynamicCircle = {
//   template: '<circle cx="0" cy="0" :r="r" :fill="color"/>',
//   props: ["origin", "index"],
//   data() {
//     const mass = Math.random() * 0.8 + 0.4;
//     return {
//       sheet: new CSSStyleSheet(),
//       animating: false,
//       x: Math.floor(Math.random() * window.innerWidth),
//       y: Math.floor(Math.random() * window.innerHeight),
//       t: performance.now(),
//       r: ((mass - 1.2) / (0.4 - 1.2)) * (14 - 2) + 2,
//       vx: 0,
//       vy: 0,
//       // Spring stiffness, in kg / s^2 */
//       K: -(Math.random() * 30 + 10),
//       // Damping constant, in kg / s
//       B: -(Math.random() * 1.5 + 0.5),
//       mass: mass,
//       color: colors[Math.floor(Math.random() * colors.length)]
//     };
//   },
//   watch: {
//     origin: {
//       handler() {
//         if (!this.animating) {
//           this.animating = true;
//           this.t = performance.now();
//           requestAnimationFrame(this.tick);
//         }
//       },
//       deep: true
//     }
//   },
//   methods: {
//     tick() {
//       const now = performance.now();
//       const t = now - this.t;
//       this.t = now;
//
//       const spring_x = this.K * (this.x - this.origin.x);
//       const damper_x = this.B * this.vx;
//       this.ax = (spring_x + damper_x) / this.mass;
//       this.vx += this.ax * (t / 1000);
//       this.x += this.vx * (t / 1000);
//
//       const spring_y = this.K * (this.y - this.origin.y);
//       const damper_y = this.B * this.vy;
//       this.ay = (spring_y + damper_y) / this.mass;
//       this.vy += this.ay * (t / 1000);
//       this.y += this.vy * (t / 1000);
//
//       this.sheet.rules[0].style.transform = `translate(${this.x}px, ${this.y}px)`;
//
//       requestAnimationFrame(this.tick);
//     }
//   },
//   created() {
//     this.sheet.insertRule(
//       `.circle-${this.index} { transform: translate(${this.x}px, ${this.y}px); }`,
//       0
//     );
//     document.adoptedStyleSheets = [...document.adoptedStyleSheets, this.sheet];
//   }
// };
import Vue from 'vue'
new Vue({
  el: "#app",
  components: {
    // DynamicCircle,
    Star,
    ShootingStar
  },
  data: {
    origin: {},
    bounds: {},
    circles: []
  },
  methods: {
    doThing(e) {
      Vue.set(this.origin, "x", e.x - this.bounds.x);
      Vue.set(this.origin, "y", e.y - this.bounds.y);
    },
    doThingTouch(e) {
      Vue.set(this.origin, "x", e.touches[0].pageX - this.bounds.x);
      Vue.set(this.origin, "y", e.touches[0].pageY - this.bounds.y);
    }
  },
  mounted() {
    this.bounds = this.$refs.svg.getBoundingClientRect();
  }
});
