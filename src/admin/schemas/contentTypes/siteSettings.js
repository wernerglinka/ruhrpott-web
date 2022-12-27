import {defineType} from 'sanity';
import {FiSettings} from "react-icons/fi";

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  icon: FiSettings,
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    { 
      name: 'social', 
      title: 'Social',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true // Defines if the fieldset should be collapsed by default or not
      }
    },
    { 
      name: 'analytics', 
      title: 'Analytics',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true // Defines if the fieldset should be collapsed by default or not
      }
    },
    { 
      name: 'siteVerification', 
      title: 'Site Verification',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true // Defines if the fieldset should be collapsed by default or not
      }
    },
  ],
  fields: [
    {
      name: 'discoverable',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Page Description',
    },
    {
      name: 'canonicalUrl',
      type: 'url',
      title: 'Canonical URL',
    },
    {
      name: 'SocialImage',
      type: 'image',
      title: 'Social Image',
      fieldset: 'social',
    },
    { 
      name: 'social',
      type: 'array',
      title: 'Social Links',
      fieldset: 'social',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Name',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Pinterest', value: 'pinterest' },
                  { title: 'GitHub', value: 'github' },
                
                ],
              },  
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
        },
      ],
    },
    {
      name: 'googleAnalytics',
      type: 'string',
      title: 'Google Analytics',
      fieldset: 'analytics',
    },
    {
      name: 'googleTagManager',
      type: 'string',
      title: 'Google Tag Manager',
      fieldset: 'analytics',
    },
    {
      name: 'googleSiteVerification',
      type: 'string',
      title: 'Google Site Verification',
      fieldset: 'siteVerification'
    },
    {
      name: 'bingSiteVerification',
      type: 'string',
      title: 'Bing Site Verification',
      fieldset: 'siteVerification'
    },
    {
      name: 'companySchema',
      type: 'text',
      title: 'Company Schema',
      description: 'Paste the JSON-LD code for your company schema here',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title,
      };
    },
  }
});
