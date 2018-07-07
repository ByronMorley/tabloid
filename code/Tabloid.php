<?php

class Tabloid extends DataExtension {

	public static $allowed_actions = array();

	private static $db = array(
	);

	private static $has_one = array();

	private static $has_many = array();

	public function contentControllerInit()
	{
		Requirements::javascript('components/jquery/jquery.min.js');
		Requirements::javascript(TABLOID_DIR .'/js/main.min.js');
	}

	public function getCMSFields()
	{
		$fields = parent::getCMSFields();
		$this->extend('updateCMSFields', $fields);
		return $fields;
	}

	public function updateCMSFields(FieldList $fields)
	{

	}

}