<template>
  <div id="app">
    <div class="file-converter">
      <h2>HEIC File Converter</h2>
      <div class="form-group">
        <label for="file-input">Select HEIC file:</label>
        <div class="file-drop"
             @dragover.prevent
             @drop.prevent="handleFileDrop">
          <input
              id="file-input"
              type="file"
              @change="handleFileSelect"
              accept=".heic"
              class="file-input"
          />
          <div class="drop-content">
            <p>Drag and drop HEIC file here</p>
            <p>or</p>
            <button @click="$refs.fileInput.click()">Choose File</button>
          </div>
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
      selectedFile: null
    }
  },
  methods: {
    async handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
  
      this.selectedFile = file;
    
      try {
        // Create FormData to send the file
        const formData = new FormData();
        formData.append('file', file);
  
        // Send file to conversion API
        const response = await fetch('https://heicto.onrender.com/convert/heic-to-jpeg/', {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // Handle successful response
        const result = await response.blob();
        const convertedFileUrl = URL.createObjectURL(result);
      
        // You can trigger download or display the converted image
        console.log('Converted file URL:', convertedFileUrl);
      
        // Optional: Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = convertedFileUrl;
        downloadLink.download = file.name.replace('.heic', '.jpg'); // or .png
        downloadLink.click();
      
        // Clean up
        URL.revokeObjectURL(convertedFileUrl);
  
      } catch (error) {
        console.error('Error converting file:', error);
        // Handle error - you might want to show this to the user
        alert('Failed to convert file. Please try again.');
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.file-converter {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
}

.form-group {
  margin: 20px 0;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
}

.file-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.preview {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>