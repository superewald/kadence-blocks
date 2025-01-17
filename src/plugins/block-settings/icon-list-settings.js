const {
	Component,
	Fragment,
} = wp.element;
import {
	Dashicon,
	Tooltip,
	SelectControl,
	Button,
	Modal,
} from '@wordpress/components';
/**
 * Internal block libraries
 */
import { __ } from '@wordpress/i18n';
class KadenceiconlistSettings extends Component {
	constructor() {
		super( ...arguments );
		this.saveConfig = this.saveConfig.bind( this );
		this.saveConfigState = this.saveConfigState.bind( this );
		this.state = {
			isOpen: false,
			isSaving: false,
			settings: ( kadence_blocks_params.settings ? JSON.parse( kadence_blocks_params.settings ) : {} ),
		};
	}
	saveConfig( blockID, settingArray ) {
		this.setState( { isSaving: true } );
		const config = ( kadence_blocks_params.settings ? JSON.parse( kadence_blocks_params.settings ) : {} );
		if ( ! config[ blockID ] ) {
			config[ blockID ] = {};
		}
		config[ blockID ] = settingArray;
		const settingModel = new wp.api.models.Settings( { kadence_blocks_settings_blocks: JSON.stringify( config ) } );
		settingModel.save().then( response => {
			this.setState( { isSaving: false, settings: config, isOpen: false } );
			kadence_blocks_params.settings = JSON.stringify( config );
		} );
	}
	saveConfigState( key, value ) {
		const config = this.state.settings;
		if ( ! config[ 'kadence/iconlist' ] ) {
			config[ 'kadence/iconlist' ] = {};
		}
		config[ 'kadence/iconlist' ][ key ] = value;
		this.setState( { settings: config } );
	}
	render() {
		const { settings, isOpen } = this.state;
		const iconlistSettings = ( settings && settings[ 'kadence/iconlist' ] ? settings[ 'kadence/iconlist' ] : {} );
		return (
			<Fragment>
				<Tooltip text="Block Settings Visibility">
					<Button className="kt-block-settings" onClick={ () => this.setState( { isOpen: true } ) }>
						<Dashicon icon="visibility" />
					</Button>
				</Tooltip>
				{ isOpen ?
					<Modal
						className="kt-block-settings-modal"
						title={ __( 'Icon List Settings' ) }
						onRequestClose={ () => {
							this.saveConfig( 'kadence/iconlist', iconlistSettings );
						} }>
						<SelectControl
							label={ __( 'Enabled All Settings For' ) }
							value={ ( iconlistSettings.allSettings ? iconlistSettings.allSettings : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users', 'kadence-blocks' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'kadence-blocks' ) },
								{ value: 'author', label: __( 'Minimum User Role Author', 'kadence-blocks' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor', 'kadence-blocks' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin', 'kadence-blocks' ) },
								{ value: 'none', label: __( 'No Users', 'kadence-blocks' ) },
							] }
							onChange={ value => this.saveConfigState( 'allSettings', value ) }
						/>
						<hr />
						<h2>{ __( 'Control Individual Settings' ) }</h2>
						<SelectControl
							label={ __( 'Enable List Column Settings' ) }
							value={ ( iconlistSettings.column ? iconlistSettings.column : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users', 'kadence-blocks' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'kadence-blocks' ) },
								{ value: 'author', label: __( 'Minimum User Role Author', 'kadence-blocks' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor', 'kadence-blocks' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin', 'kadence-blocks' ) },
								{ value: 'none', label: __( 'No Users', 'kadence-blocks' ) },
							] }
							onChange={ value => this.saveConfigState( 'column', value ) }
						/>
						<SelectControl
							label={ __( 'Enable List Spacing Settings' ) }
							value={ ( iconlistSettings.spacing ? iconlistSettings.spacing : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users', 'kadence-blocks' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'kadence-blocks' ) },
								{ value: 'author', label: __( 'Minimum User Role Author', 'kadence-blocks' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor', 'kadence-blocks' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin', 'kadence-blocks' ) },
								{ value: 'none', label: __( 'No Users', 'kadence-blocks' ) },
							] }
							onChange={ value => this.saveConfigState( 'spacing', value ) }
						/>
						<SelectControl
							label={ __( 'Enable Text Style Settings' ) }
							value={ ( iconlistSettings.textStyle ? iconlistSettings.textStyle : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users', 'kadence-blocks' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'kadence-blocks' ) },
								{ value: 'author', label: __( 'Minimum User Role Author', 'kadence-blocks' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor', 'kadence-blocks' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin', 'kadence-blocks' ) },
								{ value: 'none', label: __( 'No Users', 'kadence-blocks' ) },
							] }
							onChange={ value => this.saveConfigState( 'textStyle', value ) }
						/>
						<SelectControl
							label={ __( 'Enable All List Icon Control' ) }
							value={ ( iconlistSettings.joinedIcons ? iconlistSettings.joinedIcons : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users', 'kadence-blocks' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'kadence-blocks' ) },
								{ value: 'author', label: __( 'Minimum User Role Author', 'kadence-blocks' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor', 'kadence-blocks' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin', 'kadence-blocks' ) },
								{ value: 'none', label: __( 'No Users', 'kadence-blocks' ) },
							] }
							onChange={ value => this.saveConfigState( 'joinedIcons', value ) }
						/>
						<SelectControl
							label={ __( 'Enable individual List Item Control' ) }
							value={ ( iconlistSettings.individualIcons ? iconlistSettings.individualIcons : 'all' ) }
							options={ [
								{ value: 'all', label: __( 'All Users', 'kadence-blocks' ) },
								{ value: 'contributor', label: __( 'Minimum User Role Contributor', 'kadence-blocks' ) },
								{ value: 'author', label: __( 'Minimum User Role Author', 'kadence-blocks' ) },
								{ value: 'editor', label: __( 'Minimum User Role Editor', 'kadence-blocks' ) },
								{ value: 'admin', label: __( 'Minimum User Role Admin', 'kadence-blocks' ) },
								{ value: 'none', label: __( 'No Users', 'kadence-blocks' ) },
							] }
							onChange={ value => this.saveConfigState( 'individualIcons', value ) }
						/>
						<Button className="kt-settings-save" isPrimary onClick={ () => {
							this.saveConfig( 'kadence/iconlist', iconlistSettings );
						} }>
							{ __( 'Save/Close' ) }
						</Button>
					</Modal>
					: null }
			</Fragment>
		);
	}
}
export default KadenceiconlistSettings;
