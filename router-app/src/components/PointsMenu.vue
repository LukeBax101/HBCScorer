<template>
    <transition name="show-points">
      <div v-if="show" class="points-menu" id="points-menu">
        <h3> Points</h3>
        <div class="points-options">
          <div class="teams-list">
            <ul id="teamsList" class="teams-list-items">
                <li v-for="(item,index) in teamList" :id="`teams-list-item-${index}`" :style="col(item)" class="teams-list-items__item">
                {{ item }}
                </li>
            </ul>
          </div>
          <div class="operator-list">
            <ul id="operatorList" class="operator-list-items">
                <li v-for="(item,index) in operatorList" :id="`operator-list-item-${index}`" class="operator-list-items__item">
                {{ item }}
                </li>
            </ul>
          </div>
          <div class="points-options-value">
            <input id="points-value" type="number" name="pointsValue" min="1">
          </div>
        </div>

      </div>
    </transition>
</template>

<script>
  import Config from '../../configFile.json'
  export default {
    name: 'PointsMenu',
    data() {
      return{
        teamList: Object.keys(Config.teams),
        operatorList: ['+','-'],
        teamSelected: 0,
        operatorSelected: 1,
        stage: 0,
        colour: ''
      }
    },
    props: ['show'],
    mounted: function () {
        window.addEventListener('keydown', this.keydown);
        this.teamSelected = 0;
        this.operatorSelected = 0;
        this.stage = 0;
    },
    watch: {
      	show: function(newVal, oldVal) {
            this.teamSelected = 0;
            this.operatorSelected = 0;
            this.stage = 0;
        }
    },
    methods: {
      keydown: function (evt) {
          if (this.$props.show) {
            if (evt.key == 'Tab') {
              evt.preventDefault();
            }
            if (this.stage == 0) {
                var prevTeamSelected = this.teamSelected;
                if (evt.key == 'ArrowUp') {
                    this.teamSelected = Math.max(this.teamSelected-1,1);
                    this.updateActiveTeam(prevTeamSelected);

                } else if (evt.key == 'ArrowDown') {
                    this.teamSelected = Math.min(this.teamSelected+1,this.teamList.length);
                    this.updateActiveTeam(prevTeamSelected);

                } else if (evt.key == 'Enter' || evt.key == 'Tab' || evt.key == 'ArrowRight') {
                    this.stage = this.stage+1;
                }
            } else if (this.stage == 1) {
                var prevOperatorSelected = this.operatorSelected;
                if (evt.key == 'ArrowUp') {
                    this.operatorSelected = Math.max(this.operatorSelected-1,1);
                    this.updateActiveOperator(prevOperatorSelected);

                } else if (evt.key == 'ArrowDown') {
                    this.operatorSelected = Math.min(this.operatorSelected+1,this.operatorList.length);
                    this.updateActiveOperator(prevOperatorSelected);

                } else if (evt.key == 'Enter' || evt.key == 'Tab' || evt.key == 'ArrowRight') {

                    this.stage = this.stage+1;
                    // TODO
                    document.getElementById("points-value").focus()
                    // Move focus to input


                    //
                } else if (evt.key == 'Backspace' || evt.key == 'ArrowLeft') {
                    this.stage = this.stage-1;
                }
            } else if (this.stage == 2) {
                if (evt.key == 'Enter' || evt.key == 'Tab' || evt.key == 'ArrowRight') {
                    this.submit(this.teamSelected,this.operatorSelected);
                    document.getElementById(`teams-list-item-${this.teamSelected-1}`).classList.remove('teams-list-items__item--active');
                    document.getElementById(`operator-list-item-${this.operatorSelected-1}`).classList.add('operator-list-items__item--active');
                    this.teamSelected = 0;
                    this.operatorSelected = 0;
                    this.stage = 0;
                    //

                    // Clear the input


                    //


                } else if (evt.key == 'Backspace' || evt.key == 'ArrowLeft') {
                    this.stage = this.stage-1;
                    // TODO
                    document.getElementById("points-value").blur()
                    // Remove focus from input


                    //
                }
            }
          }
      },
      updateActiveTeam(prevTeamSelected) {
        if (this.teamSelected != prevTeamSelected) {
          if (prevTeamSelected > 0) {
              document.getElementById(`teams-list-item-${prevTeamSelected-1}`).classList.remove('teams-list-items__item--active')
          }
          document.getElementById(`teams-list-item-${this.teamSelected-1}`).classList.add('teams-list-items__item--active')
        }
      },
      updateActiveOperator(prevOperatorSelected) {
        if (this.operatorSelected != prevOperatorSelected) {
          if (prevOperatorSelected > 0) {
              document.getElementById(`operator-list-item-${prevOperatorSelected-1}`).classList.remove('operator-list-items__item--active')
          }
          document.getElementById(`operator-list-item-${this.operatorSelected-1}`).classList.add('operator-list-items__item--active')
        }
      },
      submit(team,op){
        // TODO

        // Submit the update to scores


        //
        console.log(`Get value from input, team ${team}, operator ${op}`);
      },
      col(index) {
        return `color: ${Config.teams[index]};`
      }
    }
}
</script>

<style>
.points-menu {
  background: grey;
  position: fixed;
  bottom: 0%;
  right: 0%;
  border-top-left-radius: 10px;
  border-color: black;
  border-width: 10px;
}

.points-options-value {
  margin: auto;
  padding: 5px;
}

.points-options {
  display: flex;
}


.teams-list {
  background: grey;
  height:94%;
  width:94%;
  margin:3%;
  border-radius: 4px;
  margin-top: auto;
  margin-bottom:auto;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
}

.teams-list-items__item {
  transition: all 100ms ease-out;
  transition-property: font-weight, font-size, font-style;
}

.teams-list-items__item--active {

    font-size: 1.5rem;
    font-style: italic;
    font-weight: bold;
}

.operator-list {
  background: grey;
  height:94%;
  width:94%;
  margin:3%;
  border-radius: 4px;
  margin-top: auto;
  margin-bottom:auto;
  margin-left: 5px;
  margin-right: 5px;
  padding: 5px;
}

.operator-list-items__item {
  transition: all 100ms ease-out;
  transition-property: font-weight, font-size, font-style;
}

.operator-list-items__item--active {

    font-size: 1.5rem;
    font-style: italic;
    font-weight: bold;
}
ul {
  margin:0;
  list-style-type: none;
  padding: 0;
}
h3 {
  margin:10px;
}

.show-points-enter,
.show-points-leave-to {
  opacity: 0;
}

.show-points-enter-to,
.show-points-leave {
  opacity: 1;
}

.show-points-enter-active,
.show-points-leave-active {
  transition: opacity 500ms ease-out;

}

</style>
