const sampleContent= `<!-- wp:image {"id":33699,"sizeSlug":"large","linkDestination":"none","align":"center"} -->
<figure class="wp-block-image aligncenter size-large"><img src="https://anmedia.vn/wp-content/uploads/2025/03/ban-tiec-teabreak-mitsubishi-1024x768.webp" alt="Teabreak được tổ chức tại Mitsubishi do AN media tổ chức" class="wp-image-33699"/><figcaption class="wp-element-caption"><em>Teabreak được tổ chức tại Mitsubishi do AN media tổ chức</em></figcaption></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Lý do nên tổ chức teabreak trong các sự kiện</strong></h2>
<!-- /wp:heading -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading"><strong>Tăng sự chuyên nghiệp của đơn vị tổ chức</strong></h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Một buổi teabreak được chuẩn bị chu đáo sẽ giúp sự kiện trở nên chuyên nghiệp hơn trong mắt khách mời sự kiện. Nó thể hiện sự quan tâm của ban tổ chức đối với trải nghiệm của khách mời, đồng thời tạo ra một dấu ấn tốt trong mắt đối tác, khách hàng hoặc người tham dự từ đó góp phần nâng cao hình ảnh và uy tín của doanh nghiệp hoặc tổ chức, giúp sự kiện diễn ra thành công hơn.</p>
<!-- /wp:paragraph -->`

const jsonSampleContent = [
  {
    "clientId": "eeeda905-701f-4e67-bdf9-48431c886ff5",
    "name": "core/image",
    "isValid": true,
    "attributes": {
      "align": "center",
      "url": "https://anmedia.vn/wp-content/uploads/2025/03/ban-tiec-teabreak-mitsubishi-1024x768.webp",
      "alt": "Teabreak được tổ chức tại Mitsubishi do AN media tổ chức",
      "caption": "<em>Teabreak được tổ chức tại Mitsubishi do AN media tổ chức</em>",
      "id": 33699,
      "sizeSlug": "large",
      "linkDestination": "none",
      "className": "aligncenter size-large"
    },
    "innerBlocks": [],
    "validationIssues": [],
    "originalContent": "<div class=\"wp-block-image aligncenter size-large\"><figure class=\"aligncenter size-large\"><img src=\"https://anmedia.vn/wp-content/uploads/2025/03/ban-tiec-teabreak-mitsubishi-1024x768.webp\" alt=\"Teabreak được tổ chức tại Mitsubishi do AN media tổ chức\" class=\"wp-image-33699\"/><figcaption><em>Teabreak được tổ chức tại Mitsubishi do AN media tổ chức</em></figcaption></figure></div>"
  },
  {
    "clientId": "0eb57a0d-c0d9-45b3-8531-dc0da2f12386",
    "name": "core/heading",
    "isValid": true,
    "attributes": {
      "content": "<strong>Lý do nên tổ chức teabreak trong các sự kiện</strong>",
      "level": 2,
      "className": "wp-block-heading"
    },
    "innerBlocks": [],
    "validationIssues": [],
    "originalContent": "<h2 class=\"wp-block-heading\"><strong>Lý do nên tổ chức teabreak trong các sự kiện</strong></h2>"
  },
  {
    "clientId": "e5655b24-be0c-4c4a-a515-50e032b01841",
    "name": "core/heading",
    "isValid": true,
    "attributes": {
      "content": "<strong>Tăng sự chuyên nghiệp của đơn vị tổ chức</strong>",
      "level": 3,
      "className": "wp-block-heading"
    },
    "innerBlocks": [],
    "validationIssues": [],
    "originalContent": "<h3 class=\"wp-block-heading\"><strong>Tăng sự chuyên nghiệp của đơn vị tổ chức</strong></h3>"
  },
  {
    "clientId": "c71d9c69-9fd3-45e3-80f0-923044806939",
    "name": "core/paragraph",
    "isValid": true,
    "attributes": {
      "content": "Một buổi teabreak được chuẩn bị chu đáo sẽ giúp sự kiện trở nên chuyên nghiệp hơn trong mắt khách mời sự kiện. Nó thể hiện sự quan tâm của ban tổ chức đối với trải nghiệm của khách mời, đồng thời tạo ra một dấu ấn tốt trong mắt đối tác, khách hàng hoặc người tham dự từ đó góp phần nâng cao hình ảnh và uy tín của doanh nghiệp hoặc tổ chức, giúp sự kiện diễn ra thành công hơn.",
      "dropCap": false
    },
    "innerBlocks": [],
    "validationIssues": [],
    "originalContent": "<p>Một buổi teabreak được chuẩn bị chu đáo sẽ giúp sự kiện trở nên chuyên nghiệp hơn trong mắt khách mời sự kiện. Nó thể hiện sự quan tâm của ban tổ chức đối với trải nghiệm của khách mời, đồng thời tạo ra một dấu ấn tốt trong mắt đối tác, khách hàng hoặc người tham dự từ đó góp phần nâng cao hình ảnh và uy tín của doanh nghiệp hoặc tổ chức, giúp sự kiện diễn ra thành công hơn.</p>"
  }
];
export {jsonSampleContent}
export default sampleContent