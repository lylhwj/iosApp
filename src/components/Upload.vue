<template>
  <div class="upload-warpper"> 
    <remote-script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/core.js" ></remote-script> 
    <remote-script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/md5.js" ></remote-script> 
    <input id="JS_upload_input" @click="prepare" class="file-input" type="file" name="file" @change="fileChange" :accept="uploadType=='image'?'image/*':''" />
  </div>
</template>
<script>
import upload from "@/libs/upload.js";
import crypto from "crypto";
export default {
  name: "Upload",
  data() {
    return {
      s3upload: null,
      uploadCancel: false
    };
  },
  props: ["topid", "uploadType"],
  components: {},
  methods: {
    prepare() {
      let _this = this;
      QRScanner.prepare(onDone); // show the prompt
      function onDone(err, status) {
        if (err) {
          if (err.code == 1) {
            _this.goSetting();
          } else {
            _this.toast("相机权限打开失败");
          }
        }
        if (status.authorized) {
           
        } else if (status.denied) {
          _this.goSetting();
        } else {
          _this.goSetting();
        }
        QRScanner.destroy();
      }
    },
    goSetting() {
      this.confirm({
        title: "暂时无法拍照上传，请您在设置->边乐云打开相机权限",
        rightBtnText: "设置",
        rightCallback: () => {
          QRScanner.openSettings();
        },
        width: "70%"
      });
    },
    fileChange() {
      this.upload($("#JS_upload_input")[0].files[0]);
    },
    upload(file) {
      let _this = this;
      this.fielName = file.name;
      this.$emit("start", true);
      let md5Sign = function(data) {
        let md5 = crypto
          .createHash("md5")
          .update(data, "hex")
          .digest("hex");
        return md5;
      };
      this.process(file, () => {
        file.hash = md5Sign(this.hash);
        file.folderId = this.topid || 0;
        file.alum = this.uploadType == "image" ? 1 : "";
        let S3MultiUpload = upload.S3MultiUpload;
        if (
          !(
            window.File &&
            window.FileReader &&
            window.FileList &&
            window.Blob &&
            window.Blob.prototype.slice
          )
        ) {
          _this.closePop();
          _this.$vux.toast.show({
            text: "上传失败",
            type: "cancel"
          });
          return;
        }
        _this.$emit("progress", "0");

        this.s3upload = new S3MultiUpload(file);
        this.s3upload.onServerError = function(
          command,
          jqXHR,
          textStatus,
          errorThrown
        ) {
          _this.closePop();
          _this.$vux.toast.show({
            text: "上传失败",
            type: "cancel"
          });
        };
        this.s3upload.S3UploadError = function(xhr) {
          _this.closePop();
          _this.$vux.toast.show({
            text: "上传失败",
            type: "cancel"
          });
        };
        this.s3upload.onProgressChanged = function(
          uploadedSize,
          totalSize,
          speed
        ) {
          if (_this.uploadCancel) {
            _this.toast("上传中止");
            _this.s3upload.cancel();
          }
          let progress = parseInt(uploadedSize / totalSize * 100, 10);
          _this.$emit("progress", progress);
        };
        this.s3upload.onPrepareCompleted = function() {};
        this.s3upload.onUploadCompleted = function(data) { 
          if(_this.userInfo.userid=='707860'){
            alert(JSON.stringify(data)); 
          }
          setTimeout(() => {
            _this.closePop();
            _this.$vux.toast.show("上传成功");
            _this.$emit("success", true);
          }, 500);
        };
        this.s3upload.onHitCompleted = function() {
          setTimeout(() => {
            _this.closePop();
            _this.$vux.toast.show("上传成功");
            _this.$emit("success", true);
          }, 500);
        };
        this.s3upload.start();
        this.uploadCancel = false;
      });
    },
    process(file, callback) {
      this.getMD5(file, prog => {}).then(
        res => {
          // console.log(res);
          callback();
        },
        err => console.error(err)
      );
    },
    getMD5(blob, cbProgress) {
      let that = this;
      return new Promise((resolve, reject) => {
        that.hash = "";
        this.readChunked(
          blob,
          (chunk, offs, total) => {
            var md5 = CryptoJS.algo.MD5.create();
            md5.update(CryptoJS.enc.Latin1.parse(chunk));
            var hash = md5.finalize();
            that.hash = that.hash + hash.toString(CryptoJS.enc.Hex);
            if (cbProgress) {
              cbProgress(offs / total);
            }
          },
          err => {
            if (err) {
              reject(err);
            } else {
              // TODO: Handle errors
              var md5 = CryptoJS.algo.MD5.create();
              var hash = md5.finalize();
              var hashHex = hash.toString(CryptoJS.enc.Hex);
              resolve(hashHex);
            }
          }
        );
      });
    },
    readChunked(file, chunkCallback, endCallback) {
      var fileSize = file.size;
      var chunkSize = 5 * 1024 * 1024; // 5MB
      var offset = 0;

      var reader = new FileReader();
      reader.onload = function() {
        if (reader.error) {
          endCallback(reader.error || {});
          return;
        }
        offset += reader.result.length;
        // callback for handling read chunk
        // TODO: handle errors
        chunkCallback(reader.result, offset, fileSize);
        if (offset >= fileSize) {
          endCallback(null);
          return;
        }
        readNext();
      };

      reader.onerror = function(err) {
        endCallback(err || {});
      };

      function readNext() {
        var fileSlice = file.slice(offset, offset + chunkSize);
        reader.readAsBinaryString(fileSlice);
      }
      readNext();
    }
  },
  created() {
   
  }
};
</script>
<style>
.upload-warpper {
  position: absolute;
  top: 0;
  left: 0;
  width: 2.8rem;
  height: 2.2rem;
  opacity: 0;
}
.file-input {
  width: 100%;
  height: 100%;
}
</style>
