import Config from '../../../configFile.json'
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

          if (this.stage == 0 && this.getValue() == '') {
              var prevTeamSelected = this.teamSelected;
              if (evt.key == 'ArrowUp') {
                  this.teamSelected = Math.max(this.teamSelected-1,1);
                  this.updateActiveTeam(prevTeamSelected);

              } else if (evt.key == 'ArrowDown') {
                  this.teamSelected = Math.min(this.teamSelected+1,this.teamList.length);
                  this.updateActiveTeam(prevTeamSelected);

              } else if ((evt.key == 'Enter' || evt.key == 'Tab' || evt.key == 'ArrowRight') && this.teamSelected != 0) {
                  this.stage = this.stage+1;
                  document.getElementById("teams-list").classList.remove('teams-list--active');
                  document.getElementById("operator-list").classList.add('operator-list--active');
              }
          } else if (this.stage == 1 && this.getValue() == '') {
              var prevOperatorSelected = this.operatorSelected;
              if (evt.key == 'ArrowUp') {
                  this.operatorSelected = Math.max(this.operatorSelected-1,1);
                  this.updateActiveOperator(prevOperatorSelected);

              } else if (evt.key == 'ArrowDown') {
                  this.operatorSelected = Math.min(this.operatorSelected+1,this.operatorList.length);
                  this.updateActiveOperator(prevOperatorSelected);

              } else if ((evt.key == 'Enter' || evt.key == 'Tab' || evt.key == 'ArrowRight') && this.operatorSelected != 0) {
                  this.stage = this.stage+1;
                  document.getElementById("operator-list").classList.remove('operator-list--active');
                  document.getElementById("points-value").focus()

              } else if (evt.key == 'Backspace' || evt.key == 'ArrowLeft') {
                  this.stage = this.stage-1;
                  document.getElementById("operator-list").classList.remove('operator-list--active');
                  document.getElementById("teams-list").classList.add('teams-list--active');
              }
          } else if (this.stage == 2) {
              if (evt.key == 'Enter' && this.getValue() != '') {

                  this.submit(this.teamSelected,this.operatorSelected);
                  document.getElementById(`teams-list-item-${this.teamSelected-1}`).classList.remove('teams-list-items__item--active');
                  document.getElementById(`operator-list-item-${this.operatorSelected-1}`).classList.remove('operator-list-items__item--active');
                  this.teamSelected = 0;
                  this.operatorSelected = 0;
                  this.stage = 0;
                  document.getElementById("teams-list").classList.add('teams-list--active');
                  document.getElementById("points-value").blur();
                  document.getElementById("points-value").value = '';

              } else if ((evt.key == 'Backspace' || evt.key == 'ArrowLeft') && this.getValue() == '') {
                  this.stage = this.stage-1;
                  document.getElementById("points-value").blur()
                  document.getElementById("operator-list").classList.add('operator-list--active');
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
      console.log(`${this.getDate()} ${this.operatorList[op-1]}${this.getValue()} points to team ${this.teamList[team-1]}`);
    },
    col(index) {
      return `color: ${Config.teams[index]};`
    },
    getValue() {
      return document.getElementById("points-value").value;
    },
    getDate(){
      var current = new Date();
      return `${current.getDate().toString().padStart(2, '0')}/${(current.getMonth()+1).toString().padStart(2, '0')}/${current.getFullYear()} ${current.getHours().toString().padStart(2, '0')}:${current.getMinutes().toString().padStart(2, '0')}:${current.getSeconds().toString().padStart(2, '0')}`;
    }
  }
}
