<template>
  <div id="app">
    <div class="file-converter" style="display: flex; flex-direction: column; align-items: center;">
      <h2>HEIC File Converter</h2>
      <div class="form-group">
        <label for="file-input">Select HEIC file:</label>
        <div class="file-drop"
             @dragover.prevent
             @drop.prevent="handleFileDrop">
          <input
              ref="fileInput"
              id="file-input"
              type="file"
              @change="handleFileSelect"
              accept=".heic,.heif"
              class="file-input"
          />
        </div>
      </div>
      <div class="preview" v-if="selectedFile">
        <p>Selected file: {{ selectedFile.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      selectedFile: null,
      isConverting: false
    }
  },
  methods: {
    async handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      if (!file.name.toLowerCase().endsWith('.heic') && !file.name.toLowerCase().endsWith('.heif')) {
        alert('Please select a HEIC or HEIF file');
        return;
      }

      try {
        this.selectedFile = file;
        this.isConverting = true;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('https://heicto.onrender.com/convert/heic-to-jpeg/', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const convertedFileUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = convertedFileUrl;
        downloadLink.download = file.name.toLowerCase().replace(/\.heic|\.heif/i, '.jpg');
        downloadLink.click();

      } catch (error) {
        console.error('Error converting file:', error);
        alert('Error converting file. Please try again.');
      } finally {
        this.isConverting = false;
        this.selectedFile = null;
      }
    },
    handleFileDrop(event) {
      const file = event.dataTransfer.files[0];
      if (!file) return;

      const dT = new DataTransfer();
      dT.items.add(file);
      this.$refs.fileInput.files = dT.files;

      this.handleFileSelect({target: {files: [file]}});
    }
  }
}
</script>