<form onSubmit="common.searchFile.multiplequery(this.form);return false;">
<table>
	<tr>
		<td>
		</td>
		<td>
		</td>
	</tr>
	<tr>
		<td><input type="checkbox" name="filename" checked="true" onmouseup="this.form.filename_keyword.disabled = this.checked;" />&nbsp;filename</td>
		<td><input type="text" name="filename_keyword"  /></td>
	</tr>
	<tr>
		<td><input type="checkbox" name="extension" onmouseup="this.form.extension_keyword.disabled = this.checked;" />&nbsp;extension</td>
		<td><input type="text" name="extension_keyword" disabled="disabled" /></td>
	</tr>
	<tr>
		<td><input type="checkbox" name="author" onmouseup="this.form.author_keyword.disabled = this.checked;" />&nbsp;author</td>
		<td><input type="text" name="author_keyword" disabled="disabled" /></td>
	</tr>
	<tr>
		<td><input type="checkbox" name="tags" onmouseup="this.form.tags_keyword.disabled = this.checked;" />&nbsp;tags</td>
		<td><input type="text" name="tags_keyword" disabled="disabled" /></td>
	</tr>
	<tr>
		<td><input type="checkbox" name="description" onmouseup="this.form.description_keyword.disabled = this.checked;" />&nbsp;description</td>
		<td><input type="text" name="description_keyword" disabled="disabled" /></td>
	</tr>
	<tr>
		<td colspan="2" align="right"><input type="button" value="search" onclick="common.searchFile.multiplequery(this.form);" /></td>
	</tr>
</table>
</form>