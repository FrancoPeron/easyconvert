<!-- <script>
// @ts-nocheck

  import Dropzone from "svelte-file-dropzone";
  let files = {
    accepted: [],
    rejected: []
  };
  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
  }
  function handleRemoveFile(e, index) {
    files.accepted.splice(index, 1);
    files.accepted = [...files.accepted];
  }
  function handleRemoveAll() {
    files.accepted = [];
  }

</script>

<style>
  /* :global(.custom-dropzone) {
  } */

  .previewImg{
    width: 400px;
  }
</style>

<Dropzone
  on:drop={handleFilesSelect}
  accept={['image/*']}
  containerClasses="custom-dropzone">
  <button>Choose images to upload</button>
  <p>or</p>
  <p>Drag and drop them here</p>
</Dropzone>
<div style="margin: 5px;">
  {#if files.accepted.length > 0}
    <button on:click={handleRemoveAll}>RemoveAll</button>
  {/if}
  {#each files.accepted as item, index}
    <div>

      <img class="previewImg" src={URL.createObjectURL(item)} alt="">
      <button on:click={e => handleRemoveFile(e, index)}>Remove</button>
    </div>
  {/each}
</div> -->


<p>dfsdfsdfgdfg</p>