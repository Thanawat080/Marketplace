<template>
  <div class="container is-max-desktop">
    <br /><br />
    <div class="columns">
      <div class="column is-one-third">
        <aside class="menu">
          <p class="menu-label">จัดการ</p>
          <ul class="menu-list">
            <router-link to="/mainadmin"><li>จัดการร้าน</li></router-link>
            <router-link to="/event"><li>จัดกิจกรรม</li></router-link>
          </ul>
        </aside>
      </div>
      <div class="column is-two-thirds notification is-primary is-light">
        <div class="message-header">
          <p>จัดการกิจกรรม</p>
        </div>
        <div class="box">
          <div class="field">
            <label class="label">ชื่อกิจกรรม</label>
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="ชื่อกิจกรรม"
                v-model="event_name"
              />
            </div>
          </div>
          <div class="field">
              <label class="label">ลดราคา %</label>
              <div class="control">
                <input type="number" class="input" v-model="discount" />
              </div>
            </div>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">วันเริ่ม</label>
                <div class="control">
                  <input
                    class="input"
                    type="date"
                    placeholder="Text input"
                    v-model="start_date"
                  />
                </div>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">วันสิ้นสุด</label>
                <div class="control">
                  <input
                    class="input"
                    type="date"
                    placeholder="Text input"
                    v-model="end_date"
                  />
                </div>
              </div>
            </div>
          </div>
          <button class="button is-success" @click="confirm">บันทึก</button>
        </div>

        <table
          class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
          style="width: 100%"
        >
          <!-- Your table content -->
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td style="width: 25%">{{ event.event_name }}</td>
              <td style="width: 25%">ลดราคา: {{ event.discount }} %</td>
              <td style="width: 25%">
                {{
                  event.start_date.substr(0, 10) +
                  " " +
                  event.end_date.substr(10, 20)
                }}
              </td>
              <td style="width: 25%">
                {{
                  event.end_date.substr(0, 10) +
                  " " +
                  event.end_date.substr(10, 20)
                }}
              </td>
              <td style="width: 25%">
                <button class="button is-danger" @click="deleteevent(event.id)">
                  ลบกิจกรรม
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      event_name: "",
      start_date: "",
      end_date: "",
      events: null,
      discount: "",
    };
  },
  methods: {
    deleteevent(id) {
      axios
        .delete(`http://localhost:3000/admin/deleteevent/${id}`)
        .then((res) => {
          alert(res.data);
          this.reevent();
          this.reevent();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    reevent() {
      axios
        .get("http://localhost:3000/admin/event")
        .then((response) => {
          this.events = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirm() {
      axios
        .post("http://localhost:3000/admin/addevent", {
          event_name: this.event_name,
          start_date: this.start_date,
          end_date: this.end_date,
          discount: this.discount,
        })
        .then((res) => {
          this.reevent();
          this.reevent();
          alert(res.data);
          this.event_name = "";
          this.start_date = "";
          this.end_date = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.reevent();
  },
};
</script>
