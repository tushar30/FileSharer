import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import shareFile from '@salesforce/apex/ShareFileController.shareFile';

export default class Lwc_ShareFile extends LightningElement {
    @api fileId;
    @track recordId;
    @track shareType = 'V';

    get options() {
        return [
            { label: 'Viewer', value: 'V' },
            { label: 'Inferred', value: 'I' },
        ];
    }

    handleClick(event) {
        
        if(this.fileId != null) {
            shareFile({'recordId': this.recordId, 'shareType': this.shareType, 'fileId': this.fileId})
            .then(result => {
                
                if(result.isSuccess ===  true) {
                    this.showToast('Success',  'File is shared', 'success');
                    const closeQA = new CustomEvent('close');
                    this.dispatchEvent(closeQA);

                }else {
                    this.showToast('Error While Sharing File',  result.message, 'error');
                }
            })
            .catch(error => {
                console.log(error);
                this.showToast('Error While Sharing File',  error.body.message, 'error');
            });
        }else {
            this.showToast('You are not on File detail page', 'Please go to File detail page to use this action.', 'error');
        }
    }

    showToast(title,  message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant,
            }),
        );
    }

    genericOnChange(event){
        this[event.target.name] = event.target.value;
    }
}