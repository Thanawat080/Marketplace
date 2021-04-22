<template>
     <div class="container is-max-desktop">
            <br><br>
            <div class="columns">
                <div class="column is-one-third">
                    <aside class="menu">
                        <p class="menu-label">
                            หน้าหลัก
                        </p>
                        <ul class="menu-list">
                            <li><a href="index.html">หน้าหลัก</a></li>
                            <li><a href="rent.html">เช่าเปิดร้าน</a></li>
                            <li>
                            <router-link class="navbar-item mininav" to="/seller/addstore">กรอกข้อมูลร้านค้า</router-link>
                            </li>
                        </ul>
                        <p class="menu-label">
                            สินค้า
                        </p>
                        <ul class="menu-list">
                            <router-link class="navbar-item mininav" to="/seller/addproduct">เพิ่มสินค้า</router-link>
                            <router-link class="navbar-item mininav" to="/seller/edit">แก้ไขสินค้า</router-link>
                        </ul>
                    </aside>
                </div>
                <div class="column is-two-thirds notification is-primary is-light">
                    <div class="message-header">
                        <p>ยืนยันตัวตนเพื่อเปิดร้าน</p>
                    </div>
                    <br>
                    บัตรประชาชน<div class="file has-name">
                        <label class="file-label">
                            <input class="file-input" type="file" name="resume">
                            <span class="file-cta">
                                <span class="file-icon">
                                    <i class="fas fa-upload"></i>
                                </span>
                                <span class="file-label">
                                    Choose a file…
                                </span>
                            </span>
                            <span class="file-name">
                                Screen Shot 2017-07-29 at 15.54.25.png
                            </span>
                        </label>
                    </div>
                    เลขบัตรประชาชน<input class="input" type="text" placeholder="เลขบัตรประชาชน">
                    <div class="columns">
                        <div class="column is-half">
                            วัน/เดือน/ปีเกิด<input class="input" type="date" placeholder="วันหมดอายุ">
                        </div>
                        <div class="column">
                            เลขหลังบัตรประชาชน<input class="input" type="text" placeholder="เลขหลังบัตรประชาชน">
                        </div>
                    </div>
                    ที่อยู่ปัจจุบัน<textarea class="textarea" placeholder="ที่อยู่ปัจจุบัน"></textarea>
                    <hr>
                    <button class="button is-warning">ยืนยันตัวตน</button>
                </div>

                <!-- <div class="column is-two-thirds notification is-primary is-light">
                    <div class="message-header">
                        <p>ยืนยันตัวตนเพื่อเปิดร้าน</p>
                    </div>
                    <br>
                    สถานะยืนยันตัวตน : สำเร็จ/กำลังดำเนินการ
                </div> -->
            </div>

        </div>
</template>