const {createApp} = Vue

createApp({
    data() {
        return {
            message: 'Hello Vue!',
            zoomTiger: null,
            lastEventListener: null,
            time: null,
            beforeSvg: "./111.svg",
            nextSvg: "./tiger.svg",
            embed: null,
            object: null,
            elementType: 2,
            svgDoc: null,
        }
    },
    mounted() {
        this.createEmbedOrObject(this.beforeSvg,this.elementType);
    },
    created() {
    },
    methods: {
        createEmbedOrObject(value,type){
            if (type == 1){
                this.createNewEmbed(value);
            }else {
                this.createNewObject(value);
            }
        },
        before() {
            this.removeElement();
            this.createEmbedOrObject(this.beforeSvg);
        },
        next() {
            this.removeElement();
            this.createEmbedOrObject(this.nextSvg);
        },
        createNewObject(data) {
            let that = this;
            that.object = document.createElement("object");
            // that.object.setAttribute("style", "width: 500px; height: 500px;");
            that.object.setAttribute("type", "image/svg+xml");
            that.object.setAttribute("data", data);
            that.object.setAttribute("id", "mySVG");
            document.getElementById("svgTemplate").appendChild(that.object);
            that.initSvgPanZoom(that.object);
        },
        createNewEmbed(src) {
            let that = this;
            that.embed = document.createElement('embed');
            that.embed.setAttribute('style', 'width: 500px; height: 500px; border:1px solid black;');
            that.embed.setAttribute('type', 'image/svg+xml');
            that.embed.setAttribute('src', src);
            that.embed.setAttribute("id", "mySVG");
            document.getElementById('svgTemplate').appendChild(that.embed)
            that.initSvgPanZoom(that.embed);
        },
        removeElement() {
            let that = this;
            if (that.embed != null) {
                svgPanZoom(that.embed).destroy();
                that.embed.removeEventListener('load', that.lastEventListener);
                that.lastEventListener = null
                document.getElementById('svgTemplate').removeChild(that.embed);
                that.embed = null
            }
            console.log("removed...........");
        },
        initSvgPanZoom(element){
            let that = this;
            that.lastEventListener = function () {
                svgPanZoom(element, {
                    // viewportSelector: '.svg-pan-zoom_viewport',
                    zoomEnabled: true,
                    controlIconsEnabled: true,
                    dblClickZoomEnabled: false,
                    // mouseWheelZoomEnabled: true,
                    controlIconsEnabled: false,
                    fit:true,
                    center:true,
                    preventMouseEventsDefault: true,
                });
            }
            element.addEventListener('load', that.lastEventListener);
        },
        addIcon(){
            let that = this;
            that.svgDoc = document.getElementById("mySVG").getSVGDocument();
            // that.packageIconInfo({x:759,y:434});
            that.packageIconInfoTest({x:759,y:434});
        },
        packageIconInfoTest(data){
            let n = 17/2;
            let l = 14/2;
            var g = this.svgDoc.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('z-index', 98);
            g.innerHTML = "<path d=\"M16,7 L16,4 L10.5,4 L10.5,7 L16,7 Z M16,10 L10,10 L10,8 L7,8 L7,11 L16,11 L16,10 Z M17,4 L17,11 L20,11 L20,4 L17,4 Z M20,2 L20,0 L21,0 L21,15 L20,15 L20,13 L7,13 L7,15 L6,15 L6,0 L7,0 L7,2 L20,2 Z M2.76540822,5 L2.79470279,6.76098023 L5.57348648,6.76098023 L5.57348648,8.99965245 L2.76540822,8.99965245 L2.76540822,10.5506465 L0,7.77532325 L2.76540822,5 Z\"  fill=\"#00F200\"></path>\\n<rect fill=\"#D8D8D8\" opacity=\"0\" x=\"7\" y=\"2.5\" width=\"13\" height=\"10\"></rect>";
            g.setAttribute("transform", "translate(" + (data.x- n) + "," + (data.y - l) + ") scale(1)");
            g.addEventListener("click", function() {
                alert('圆形点击测试');
            });
            this.svgDoc.rootElement.querySelector("g").appendChild(g);
        },
        packageIconInfo(data){
            var c = this.svgDoc.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('cx', data.x);
            c.setAttribute('cy', data.y);
            c.r.baseVal.value = 7;
            c.setAttribute('fill', 'green');
            c.addEventListener("click", function() {
                alert('圆形点击测试：');
            });
            c.addEventListener("mouseover", function() {
                console.log('圆形鼠标悬停测试：');
            });
            this.svgDoc.rootElement.querySelector("g").appendChild(c);
        },
        changeSvgElementColor(){
            let svg = document.getElementById("mySVG").contentDocument;
            // 获取需要修改颜色的元素
            let element = svg.getElementById("area1_air_02_003");

            // 修改元素的颜色
            element.style.fill = "red"; // 修改填充色
            element.style.stroke = "blue"; // 修改边框颜色
        }
    },
}).mount('#app')

