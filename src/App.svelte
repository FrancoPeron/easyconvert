<script>
  // @ts-nocheck

  import Dropzone from "svelte-file-dropzone";
  import JSZip from "jszip";
  import { saveAs } from 'file-saver';

/* || Data || ----------------------------------------*/

  let dataImgsFiles = [];
  let quality = 0.45
  
/* || Functions || ----------------------------------------*/

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    acceptedFiles.forEach((element)=>{
      dataImgsFiles = [...dataImgsFiles,{...element, id:crypto.randomUUID(),src:URL.createObjectURL(element)}]
    })
  }
  
  function handleRemoveAll(e) {
    e.stopPropagation();
    dataImgsFiles = [];
  }

  function handleRemoveFile(e, index) {
    dataImgsFiles.splice(index, 1);
    dataImgsFiles = dataImgsFiles

    setTimeout(removeBedelay,5)
    setTimeout(addBedelay,10)
    setTimeout(addDownImgs,15)

  }

  function removeBedelay(){
    dataImgsFiles.forEach(element => {
      document.getElementById(element.id).classList.remove("bedelay")
      document.getElementById(element.id).removeAttribute("href")
      document.getElementById(element.id).removeAttribute("download")
    });
  }

  function addBedelay(){
    dataImgsFiles.forEach(element => {
      if (element.webpImg) {
        document.getElementById(element.id).classList.add("bedelay")
      }
    });
  }

  function addDownImgs(){
    dataImgsFiles.forEach(element => {
      if (element.webpImg) {
        let enlace = document.getElementById(element.id)
        enlace.download = `${element.path.split(".", 1)[0]}.webp`;
        enlace.href = element.webpImg;
      }
    })
  }

  function convertImgWebp(){
    //Creo el canvas
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    for (let index = 0; index < dataImgsFiles.length; index++) {
      //Creo una imagen nueva
      let img = new Image();
      //Cargo la imagen al canvas
      img.src = dataImgsFiles[index].src;
      console.log(img.src)
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        //Convierto el cavas en webp
        let webpImage = canvas.toDataURL("image/webp", quality);
        
        // --> Guardo la imagen convertida
        dataImgsFiles[index] = {...dataImgsFiles[index],webpImg: String(webpImage)}

        canvas.toBlob((bolbImage) => {
          dataImgsFiles[index] = {...dataImgsFiles[index],canvasImg: bolbImage}
        },"image/webp", quality);

        addBedelay()
        addDownImgs()

      };
    }
    // console.log("dataImgsFiles",dataImgsFiles)
    // console.log("files.accepted",files.accepted)
  }

  function downloadZip(){

    let zip = new JSZip();
    dataImgsFiles.forEach(element => {
      zip.file(element.path.split(".", 1)[0] + ".webp", element.canvasImg)
    });
    console.log(zip)
    
    zip.generateAsync({type:"blob"})
    .then(function(content) {
      saveAs(content, "photos.zip");
    });

  }

</script>

<main class="main-index">

  <h1 class="main-index__name">EasyWebp</h1>

  <Dropzone containerClasses="upload-box" disableDefaultStyles="true" on:drop={handleFilesSelect} accept={["image/*"]}>

    <svg width="120" height="85" viewBox="0 0 120 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="#292929" stroke="#fff" stroke-width="3.5" d="M56.4483 0.124142C44.5089 1.29674 33.8652 7.74604 27.2476 17.8304C26.3914 19.1203 25.6973 20.1991 25.6741 20.246C25.651 20.2929 24.818 20.5039 23.8231 20.7619C18.2698 22.0987 13.4802 24.7956 9.50034 28.8528C4.15535 34.2468 1.19363 41.1417 0.892828 48.9043C0.430058 60.7007 6.8857 71.6293 17.4831 76.9529C21.5555 78.9932 25.3039 79.8375 31.158 80.0251C36.3179 80.1893 37.2665 80.0017 38.7705 78.4538C41.2232 75.9914 40.6447 72.1687 37.5905 70.6209C36.4335 70.0346 36.2022 70.0111 32.662 70.0111C27.155 70.0111 24.6561 69.4952 21.2084 67.619C17.5757 65.6725 14.8453 62.8817 12.948 59.1763C9.08385 51.5544 10.4027 42.2908 16.2105 36.2168C19.6581 32.6052 23.2677 30.8697 29.1449 29.9551C31.505 29.5799 32.3149 28.9232 33.8652 26.0386C38.2152 17.9242 45.365 12.4833 54.2733 10.5368C55.731 10.2085 57.235 10.1147 60.0579 10.1147C64.2923 10.1147 66.3285 10.443 69.7761 11.6625C74.1956 13.2573 77.8052 15.6025 81.1371 19.0499C85.4409 23.5058 87.9167 28.3134 89.1893 34.5751C89.4669 35.9353 89.8372 37.2721 90.0223 37.5535C91.0404 39.1248 92.6601 39.9691 94.65 39.9925C101.314 40.0395 107.469 44.9878 108.973 51.484C109.435 53.4305 109.435 56.5731 108.973 58.5196C108.024 62.6237 104.993 66.4933 101.244 68.346C98.2596 69.8235 97.0101 70.0111 89.8834 70.0111H83.7517L82.5254 70.6209C79.4711 72.1687 78.8927 75.9914 81.3453 78.4773C82.9188 80.072 83.5666 80.1893 91.4337 80.0251C98.4447 79.8844 99.671 79.7202 103.234 78.4069C110.5 75.7568 116.47 69.0496 118.529 61.2166C119.061 59.1294 119.13 58.4493 119.13 55.0018C119.13 51.5778 119.061 50.8743 118.529 48.8574C116.146 39.8049 109.366 33.0038 100.481 30.729L98.3984 30.2131L97.5191 27.4926C93.0071 13.5621 81.0677 3.05564 66.9763 0.616633C63.7832 0.0537854 59.2944 -0.157282 56.4483 0.124142Z"/>
      <path fill="#292929" stroke="#fff" stroke-width="3.5" d="M57.8598 35.5366C56.5409 36.1933 41.2232 51.7888 40.7373 52.938C39.4415 56.1275 41.4777 59.6453 44.7634 59.8798C47.0541 60.0439 47.5169 59.7625 51.543 55.7522L55.1988 52.1172V66.7043C55.1988 80.5879 55.222 81.3384 55.6385 82.1592C57.5821 85.9819 62.7189 85.935 64.4774 82.0888C64.8707 81.1977 64.917 80.2596 64.917 66.634V52.1172L68.5729 55.7522C72.599 59.7625 73.0618 60.0439 75.3293 59.8798C77.7589 59.6922 79.4942 57.9333 79.6794 55.4708C79.8645 52.9614 79.9339 53.0552 71.1875 44.1435C65.9814 38.8433 62.8577 35.8415 62.2561 35.5366C61.0066 34.9268 59.0861 34.9268 57.8598 35.5366Z"/>
    </svg>
    <div class="upload-box__text">
      <p class="upload-box__title">Drag and Drop here</p>
      <p class="upload-box__subtitle">JPG, JPEG & PNG</p>
    </div>
    <div class="upload-box__or">
      <span class="line"></span>
      <p>or</p>
      <span class="line"></span>
    </div>
    <button class="upload-box__btn">Upload Files</button>
    <div class="upload-box__cont-remove">
      <p class="upload-box__count">{dataImgsFiles.length} files uploaded</p>
      {#if dataImgsFiles.length > 0}
        <button class="upload-box__removeAll" on:click={handleRemoveAll}>Remove All</button>
      {/if}
    </div>

  </Dropzone>
  
  <section class="imgs-box">

    <div class="imgs-list">
      {#each dataImgsFiles as item, index}
        <div class="imgs-list__item">
          <a class="imgs-list__img" id={item.id}>
            <img class="imgs-list__preview-img" src={item.src} alt="" />
          </a>
          <div class="imgs-list__box">
            <p class="imgs-list__name">{item.path}</p>
            <button class="imgs-list__remove" on:click={(e) => handleRemoveFile(e, index)}>
              <svg width="12" height="12" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.989525 0.318016C1.18479 0.122754 1.50137 0.122754 1.69663 0.318016L7.35349 5.97487C7.54875 6.17013 7.54875 6.48672 7.35349 6.68198C7.15822 6.87724 6.84164 6.87724 6.64638 6.68198L0.989525 1.02512C0.794263 0.829861 0.794263 0.513279 0.989525 0.318016Z" fill="#1F1F1F"/>
                <path d="M0.989525 0.318016C1.18479 0.122754 1.50137 0.122754 1.69663 0.318016L7.35349 5.97487C7.54875 6.17013 7.54875 6.48672 7.35349 6.68198C7.15822 6.87724 6.84164 6.87724 6.64638 6.68198L0.989525 1.02512C0.794263 0.829861 0.794263 0.513279 0.989525 0.318016Z" fill="#1F1F1F"/>
                <path d="M0.989576 6.682C0.794314 6.48674 0.794314 6.17015 0.989576 5.97489L6.64643 0.318038C6.84169 0.122776 7.15827 0.122776 7.35354 0.318038C7.5488 0.5133 7.5488 0.829883 7.35354 1.02514L1.69668 6.682C1.50142 6.87726 1.18484 6.87726 0.989576 6.682Z" fill="#1F1F1F"/>
                <path d="M0.989576 6.682C0.794314 6.48674 0.794314 6.17015 0.989576 5.97489L6.64643 0.318038C6.84169 0.122776 7.15827 0.122776 7.35354 0.318038C7.5488 0.5133 7.5488 0.829883 7.35354 1.02514L1.69668 6.682C1.50142 6.87726 1.18484 6.87726 0.989576 6.682Z" fill="#1F1F1F"/>
              </svg>
            </button>
          </div>
        </div>
      {/each}
    </div>

    <div class="imgs-box__nav">
      <div class="imgs-box__input">
        <input type="range" id="volume" min="0" max="0.9" bind:value="{quality}" step="0.05">
        {quality}
      </div>
      <div class="imgs-box__btns">
        <button class="imgs-box__down" on:click={downloadZip}>Download as Zip File</button>
        <button class="imgs-box__convert" on:click={convertImgWebp}>Convert</button>
      </div>
    </div>

  </section>

</main>

<style lang="scss">

  $cWhite: #ffffff;
  $cGrey1: #FAFAFA;
  $cGrey2: #F0F0F0;
  $cGrey3: #DBDBDB;
  $cGrey4: #C2C2C2;
  $cGrey5: #9E9E9E;
  $cGrey6: #7A7A7A;
  $cGrey7: #575757;
  $cGrey8: #3D3D3D;
  $cGrey9: #292929;
  $cGrey10: #1F1F1F;
  $cBlack: #000000;

  @import "src/assets/styles/style.scss";

  .main-index{
    @extend %container-center;
    display: grid;
    grid-template-areas: "name name"
                        "upload imgs";
    grid-template-columns: 350px 1fr;
    justify-content: center;
    margin: auto;
    column-gap: 2rem;


    .main-index__name{
      @include font(fbt1, w600);
      grid-area: name;
      margin: 42px 0;
      justify-self: center;
    }

    //--------------------------------------------

    :global(.upload-box) {
      grid-area: upload;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 42px 0px;
      gap: 32px;
  
      width: 350px;
      height: 510px;
  
      // background: #FAFAFA;
      // border: 2.5px dashed #3D3D3D;
      border: none;
      background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23333' stroke-width='5' stroke-dasharray='10%2c15' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
      border-radius: 16px;

    }
      .upload-box__text{
        @include flex(column);
        align-items: center;
        gap: 1rem;

        .upload-box__title{
          @include font(ft2);
          color: $cGrey10;
        }
  
        .upload-box__subtitle{
          @include font(b1, w400);
          color: $cGrey7;
        }
      }
      
      .upload-box__or{
        @include flex();
        justify-content: space-between;
        align-items: center;
        width: fit-content;
        gap: 1rem;

        .line{
          height: 2px;
          width: 40px;
          background: $cGrey5;
        }

        p{
          @include font(fb1, w500);
          color: $cGrey6;
        }

      }

      .upload-box__btn{
        @include btn(cW,bgB);
      }

      .upload-box__cont-remove{
        @include flex(column);
        align-items: center;
        gap: 1rem;

        .upload-box__count{
          @include font(fb1);
          color: $cGrey7;
        }
        .upload-box__removeAll{
          font-family: 'EuclidCircular';
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
          text-decoration-line: underline;
          text-underline-offset: 6px;
          text-decoration-thickness: 1.5px;
          padding: 0.5rem;
        }
      }

    //--------------------------------------------

    .imgs-box{
      grid-area: imgs;
      @include flex(column);
      height: 510px;

      background: #FFFFFF;
      box-shadow: 0px 4px 40px rgba(165, 165, 165, 0.25);
      border-radius: 16px;
      overflow: hidden;

      .imgs-list{
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, .5fr));
        gap: 1.5rem;
        overflow: auto;
        padding-right: 0.5rem;
        height: 100%;
        padding: 1.5rem;

        .imgs-list__item{
          position: relative;
          @include flex(column);
          box-shadow: 0px 0px 12px rgba(146, 146, 146, 0.25);
          height: max-content;
          border-radius: 6px;

          .imgs-list__img{

            display: inherit;
            
            .imgs-list__preview-img{
              width: 100%;
              height: 200px;
              object-fit: cover;
              border: 3px solid #FFFFFF;
              border-radius: 6px 6px 0 0 ;
            }

          }


          .imgs-list__box{
            @include flex();
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            gap: 6px;
            border-radius: 0 0 6px 6px;

            .imgs-list__name{
              @include font(fb2, w500);
              text-overflow: ellipsis;
              overflow: hidden; 
              width: 100%;
              white-space: nowrap;
            }

            .imgs-list__remove{
              height: 12px;
            }
          }
        }
      }

      .imgs-box__nav{
        @include flex();
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid rgba(0, 0, 0, 0.16);
        background: #FDFDFD;
        width: 100%;
        min-height: 80px;
        padding: 0 1.5rem;

        .imgs-box__btns{
          @include flex();
          align-items: center;
          gap: 24px;

          .imgs-box__down{
            font-family: 'EuclidCircular';
            font-weight: 500;
            font-size: 18px;
            line-height: 20px;
            padding: 0.5rem;
            &:hover{
              text-decoration-line: underline;
              text-underline-offset: 6px;
              text-decoration-thickness: 1.5px;
            }
          }
  
          .imgs-box__convert{
            @include btn(cW,bgB);
            font-size: 18px;
            height: 42px;
          }
        }


      }

    }

  }

</style>
