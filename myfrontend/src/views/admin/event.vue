<template>
        <div class="container is-max-desktop">
            <br><br>
            <div class="columns">
                <div class="column is-one-third">
                    <aside class="menu">
                        <p class="menu-label">
                            จัดการ
                          </p>
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
                    <br>
                    ชื่อกิจกรรม <input class="input" type="text" placeholder="ชื่อกิจกรรม">
                    <br><br>
                    วันเริ่ม
                    <div class="columns">
                        <div class="column is-half">
                            <input class="input" type="date" placeholder="Text input">
                        </div>
                        <div class="column">
                            <input class="input" type="time" placeholder="Text input">
                        </div>
                    </div>
                    วันสินสุด
                    <div class="columns">
                        <div class="column is-half">
                            <input class="input" type="date" placeholder="Text input">
                        </div>
                        <div class="column">
                            <input class="input" type="time" placeholder="Text input">
                        </div>
                    </div>
                    <button class="button is-success">บันทึก</button>

                    <br><br>
                    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
                        style="width: 100%;">
                        <!-- Your table content -->
                        <tbody>
                            <tr>
                                <td style="width: 25%;">ชื่อกิจกรรม</td>
                                <td style="width: 25%;">เริ่ม</td>
                                <td style="width: 25%;">สิ้นสุด</td>
                                <td style="width: 25%;"><button class="button is-danger">ลบกิจกรรม</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        </div>
</template>